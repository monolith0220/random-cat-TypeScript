import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

type Image = {
	url: string;
};

type Props = {
	initialImageUrl: string;
};

const fetchImage = async (): Promise<Image> => {
	const res = await fetch("https://api.thecatapi.com/v1/images/search");
	const images = await res.json();
	return images[0];
};

// サーバーサイド
export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const image = await fetchImage();

	return {
		props: {
			initialImageUrl: image.url,
		},
	};
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
	const [imageUrl, setImageUrl] = useState(initialImageUrl);
	const [loading, setLoading] = useState(false);

	// クライアント側
	// useEffect(() => {
	// 	fetchImage().then((newImage) => {
	// 		setLoading(false);
	// 		console.log(newImage.url);
	// 		setImageUrl(newImage.url);
	// 	});
	// }, []);

	const handleClick = async () => {
		setLoading(true);
		const newImage = await fetchImage();
		setImageUrl(newImage.url);
		setLoading(false);
	};

	return (
		<div>
			<h1>猫画像</h1>
			<div>
				<button onClick={handleClick}>ボタン</button>
			</div>
			<div>{loading ? <p>ローディング中</p> : <img src={imageUrl} alt="" />}</div>
		</div>
	);
};

export default IndexPage;
