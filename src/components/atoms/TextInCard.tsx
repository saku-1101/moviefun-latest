export default function TextInCard(sent_data) {
  return (
    <div>
      <h3>{sent_data.name}</h3>
      <p>{sent_data.uid}</p>
    </div>
  );
}
