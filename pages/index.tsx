import { NextPage } from "next";
import { useEffect, useState } from "react";

type Image = {
	url: string;
};

const fetchImage = async (): Promise<Image> => {
	const res = await fetch("https://api.thecatapi.com/v1/images/search");
	const images = await res.json();
	return images[0];
};

const IndexPage: NextPage = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchImage().then((newImage) => {
			setLoading(false);
			console.log(newImage.url);
			setImageUrl(newImage.url);
		});
	}, []);

	const handleClick = async () => {
		setLoading(true);
		const newImage = await fetchImage();
		setImageUrl(newImage.url);
		setLoading(false);
	};

	return (
		<div>
			<h1>猫画像</h1>
			<button onClick={handleClick}>ボタン</button>
			{loading ? <p>ローディング中</p> : <img src={imageUrl} alt="" />}
		</div>
	);
};

export default IndexPage;
