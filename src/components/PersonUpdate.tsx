import React, { FC, useState } from 'react';
import { Alert, Button, Form, Nav, FormControl, FormControlProps, InputGroup } from 'react-bootstrap';
import { Person, InputPerson, MutationSavePersonArgs, MutationUpdatePersonArgs, GraphQlPaginationInputSort } from '../data/datatypes';
import { DataTableColumn } from './DataTable/types';
import * as TimeUtils from './Util/TimeUtils';
import { from, ExecutionResult } from 'apollo-boost';
import DataTable from './DataTable/DataTable';
import { useUpdatePersonMutation, UpdatePersonMutationVariables, useDeletePersonMutation, UpdatePersonMutation, useFindPersonlistByQuery } from '../data/schema.generated';
import TableEditorText from './DataTable/Text';
import useDataTableWithPagination from './hooks/useDataTableWithPagination';


const PersonUpdate: FC = () => {
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  // const [nameFilter, setNameFilter] = useState('');
  // const [nameFilter, setNameFilter] = useState('');
  // const [nameFilter, setNameFilter] = useState('');
  const [vorname, setVorname] = useState<string | any>();
  const [nachname, setNachname] = useState<string | any>();
  const [skill, setSkill] = useState<string | any>();
  const [sorts, setSorts] = useState<GraphQlPaginationInputSort[]>([]);
  const [geburtsdatum, setGeburtsdatum] = useState<string | any>();
  type FormElem = React.FormEvent<HTMLFormElement | HTMLButtonElement>;
  type FormContr = React.FormEvent<FormControlProps & FormControl>;
  const { data, fetchMore, variables, refetch, loading } = useFindPersonlistByQuery({
    variables: {
       vorname: nameFilter,
      pagination: {
        offsetPage: 0,
        pageSize: 20,  
        sorts,     
      },
    },

    fetchPolicy: 'cache-and-network',
  });
  const paginationHelper = useDataTableWithPagination(
    variables,
    data ? data.findPersonlistBy : null,
    fetchMore,
);
  const [updatePersonMutation] = useUpdatePersonMutation({
    variables: {
      id: 0,// value for 'id'
      input: {
        vorname: "",
        nachname: "",
        skill: "",
        geburtsdatum: ""
      } // value for 'input'
    },
  });

  const [deletePersonMutation] = useDeletePersonMutation({
    variables: {
      id: 0
    },
  });
  const columns: DataTableColumn<Person>[] = [
    {
      name: 'vorname',
      accessor: row => <TableEditorText value={row.vorname || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: InputPerson = {
              vorname: value,
              nachname: row.nachname,
              skill: row.skill,
              geburtsdatum: row.geburtsdatum

            };
            const payload: UpdatePersonMutationVariables = {
              id:Number(row.id),
              input: one
            };
            updatePersonMutation({ variables: payload });
          }
        }
      } />
    },

    {
      name: 'Nachname',
      accessor: row => <TableEditorText value={row.nachname || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: InputPerson = {
              vorname: row.vorname,
              nachname: value,
              skill: row.skill,
              geburtsdatum: row.geburtsdatum

            };
            const payload: UpdatePersonMutationVariables = {
              id: Number(row.id),
              input: one
            };
            updatePersonMutation({ variables: payload });
          }
        }
      } />,
      sortBy: { fieldName: 'nachname' },
    },
    {
      name: 'Geburtsdatum ', accessor: row => (
        row.geburtsdatum
        //!== null ? TimeUtils.convertAndFormatTimestamp(row.geburtsdatum) : ''

      )
    },

    {
      name: 'delete',
      accessor: row => (
        <Button variant="primary" onClick={(e: FormElem) => {
          deletePersonMutation({
            variables: {
              id: Number(row.id)
            }
          }).then(() => {
            e.preventDefault();
          });
          e.preventDefault();
        }

        }>
          Delete
        </Button>
      ),
    },
  ];
  return (<>

    <Form.Group controlId="formPersonUpdate">
      <Form.Label>Person Name</Form.Label>
      <Form.Control
        type="text"
        value={`${nameFilter}`}
        onChange={(e: React.FormEvent<any>) => setNameFilter(e.currentTarget.value)}
        placeholder="name"
      />
    </Form.Group>

    <DataTable
      idColumnName="id"
      pagination={paginationHelper}
      data={data && data.findPersonlistBy?data.findPersonlistBy.result:null}
      columns={columns}
      showHeader
      showSuche
    />
  </>)
};
export default PersonUpdate;