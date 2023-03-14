import getAllKeywordsIds from '../../core/infrastructures/getKeyword';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { text } from 'stream/consumers';

export default function InputField() {
  const [keys, getAllKeywordsIdsState] = useState([0]);
  const [text, detectTextChange] = useState('');
  const HandleGetAllKeywordsIds = async () => {
    getAllKeywordsIdsState(await getAllKeywordsIds(text));
  };
  getAllKeywordsIds('sakura');
  return (
    <div>
      <form>
        <input
          type="text"
          id="message"
          value={text}
          onChange={(event) => detectTextChange(event.target.value)}
          placeholder="I wanna be fulfilled and confident."
        />
        <p>{text}</p>
        <Button variant="outline-secondary" id="button-addon2" onClick={HandleGetAllKeywordsIds}>
          Button
        </Button>
      </form>
    </div>
  );
}
