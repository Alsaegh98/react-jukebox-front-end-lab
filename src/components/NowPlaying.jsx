// src/components/NowPlaying.jsx
const NowPlaying = (props) => {
  if (!props.selected)
    return (
      <div>
        <h1>No Details</h1>
      </div>
    );

  return (
    <div>
      <h1>Now Playing:</h1>
      <p><strong>Title:</strong> {props.selected.title}</p>
      <p><strong>Artist:</strong> {props.selected.artist}</p>
    </div>
  );
};

export default NowPlaying;
