import React, { FC, useState, FormEvent, useEffect, useRef, RefObject } from 'react';
import { Form, FormControlProps, FormControl, FormText, Button } from 'react-bootstrap';


interface Value {
    value: string;
    setValue: (value: string) => void

}
const TableEditorText: FC<Value> = ({ value, setValue }) => {
    const [editorActive, setEditorActive] = useState<boolean>(false);
    const inputRef = useRef<FormControl & HTMLInputElement>(null);

    const [editValue, setEditValue] = useState(value);

    useEffect(() => {

        if (editorActive) {
            if (inputRef && inputRef.current) {
                inputRef.current.focus();
            }
        }

    }, [editorActive])
    return (<div>
        {editorActive &&
            <Form.Group controlId="formBasicEmail">
                <Form.Control ref={inputRef} type="text" value={editValue}
                    onChange={(evt: FormEvent<FormControlProps & FormControl & any>) => {
                        setEditValue(evt.currentTarget.value || ''); }
                    } />
                <Button  variant="primary" onClick={() => { setEditorActive(false); setValue(editValue);  }}> save </Button>
                <Button  variant="primary" onClick={(evt: FormEvent<FormControlProps & FormControl & any>) => { setEditorActive(false);setEditValue(value) }}> cancel </Button>
            </Form.Group>
            ||
            <div onClick={(e) => { setEditorActive(true) }}>
                {value}
            </div>
        }


    </div>)
}

export default TableEditorText;
//   onBlur={()=>{setEditorActive(false);setValue(editValue);}}