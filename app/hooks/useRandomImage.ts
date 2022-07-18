import React from "react";

export const useRandomImage = () => {
  const [image, setImage] = React.useState<string | null>(null);

  async function getImage(tag) {
    try {
      const res = await fetch(`http://api.nekos.fun:8080/api/${tag}`);
      const json = await res.json();
      setImage(json.image);
    } catch (err) {
      console.log(err);
    }
  }
  getImage("poke");

  return { image };
};
