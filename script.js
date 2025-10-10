const colorThief = new ColorThief();

async function fetchData() {
  try {
    const username = document.getElementById("username").value.toLowerCase();
    const response = await fetch(
      `https://lastcard-fm-backend-v1-0.onrender.com/${username}`
    );

    if (!response.ok) {
      throw new Error("Não foi possível localizar");
    }

    const data = await response.json();
    let albumName = data.topalbums.album[0].name;
    let artistName = data.topalbums.album[0].artist.name;
    let artistUrl = data.topalbums.album[0].artist.url;
    let albumImage = data.topalbums.album[0].image[3]["#text"];

    
    // mudando imagem
    let albumImageSrc = document.getElementById("albumImage");
    
    albumImageSrc.crossOrigin = "Anonymous";
    albumImageSrc.src = albumImage;
    albumImageSrc.style.display = "block";

    // nome do album
    let albumNameParagraph = document.getElementById("albumNameParagraph");
    albumNameParagraph.style.display = "block";
    albumNameParagraph.innerHTML = albumName;

    // mudando nome do artista
    let artistNameParagraph = document.getElementById("artistNameParagraph");
    artistNameParagraph.style.display = "block";
    artistNameParagraph.innerHTML = artistName;

    // colorThief
    const colorThiefImg = albumImageSrc;

    function processImage() {
      const dominantColor = colorThief.getColor(colorThiefImg);
      console.log("cor dominante: " + dominantColor);

      const colorPalette = colorThief.getPalette(colorThiefImg, 10);
      console.log("paleta: " + colorPalette);

      const corCarta = colorPalette[1];

      // mudando o bg
      document.body.style.backgroundColor = `rgb(${colorPalette[0].join(',')})`;
      
      // mudando cor da carta
      let cardColor = document.getElementById("card");
      cardColor.style.backgroundColor = `rgb(${colorPalette[5].join(',')})`;

      let username = document.getElementById("username");
      username.style.backgroundColor = `rgb(${colorPalette[5].join(',')})`;

      let button = document.getElementById("button");
      button.style.backgroundColor = `rgb(${colorPalette[5].join(',')})`;
    
    }
    if (colorThiefImg.complete) {
      processImage();
    } else {
      colorThiefImg.addEventListener('load', processImage);
    }

    // log no terminal
    console.log(
      "album name: " +
        albumName +
        "\n" +
        "artist name: " +
        artistName +
        "\n" +
        "artist URL: " +
        artistUrl +
        "\n" +
        "Images: " +
        albumImage
    );
  } catch (error) {
    console.error(error);
  }
}
