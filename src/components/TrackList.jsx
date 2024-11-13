// src/components/TrackList.jsx
const TrackList = (props) => {
  const tracks = props.trackList.map((track) => (
    <div key={track._id}>
      <li onClick={() => props.updateSelected(track)}>{track.title}</li>
      <button onClick={() => props.updateSelected(track)}>Edit</button>
      <button onClick={() => props.handleRemoveTrack(track._id)}>Delete</button>
      <button onClick={() => props.handlePlay(track)}>Play</button> {/* Added Play button */}
    </div>
  ));

  return (
    <div>
      <h1>Track List</h1>
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Track'}
      </button>
      <ul>{!props.trackList.length ? <h2>No Tracks Yet!</h2> : <ul>{tracks}</ul>}</ul>
    </div>
  );
};

export default TrackList;
