// import getAllKeywordsIds from '../../core/infrastructures/getKeyword';
import getIDofMovies from '../../core/infrastructures/getMovie';
import { getPrefectures } from '../../core/infrastructures/api/Resas.api';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function InputField() {
  const inputRef = useRef('');
  // const [keys, getAllKeywordsIdsState] = useState([0]);
  // const HandleGetAllKeywordsIds = async () => {
  //   getAllKeywordsIdsState(await getAllKeywordsIds(inputRef.current.valueOf()));
  // };
  getIDofMovies();
  // getAllKeywordsIds('sakura');
  getPrefectures();
  return (
    <div>
      <InputGroup className="mb-3">
        <input
          ref={inputRef}
          type="text"
          id="message"
          name="message"
          placeholder="I wanna be fulfilled and confident."
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>
    </div>
  );
}
