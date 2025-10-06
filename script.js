async function fetchData() {
  try {
    const username = document.getElementById("username").value.toLowerCase();
    const response = await fetch(`http://localhost:8080/${username}`);

    if (!response.ok) {
      throw new Error("Não foi possível localizar");
    }

    const data = await response.json();
    let albumName = data.topalbums.album[0].name;
    let artistName = data.topalbums.album[0].artist.name;
    let artistUrl = data.topalbums.album[0].artist.url;
    let albumImage = data.topalbums.album[0].image[3]["#text"];

    let albumImageSrc = document.getElementById("albumImage");
    albumImageSrc.src = albumImage;
    albumImageSrc.style.display = "block";

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
