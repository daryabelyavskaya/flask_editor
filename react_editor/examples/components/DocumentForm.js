import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField,
} from '@material-ui/core';
import { compose } from 'recompose';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Common from './common/Common';
const styles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
    maxWidth: 500,
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));

const DocumentForm = ({ document, onSave, handleModalClose }) => (
  <Form initialValues={document} onSubmit={onSave}>
    {({ handleSubmit }) => (
      <Modal
        onClose={handleModalClose }
        open
      >
        <Card >
          <form onSubmit={handleSubmit}>
            <CardContent >
              <Field name="name">
                {({ input }) => <TextField label="Document name" autoFocus {...input} />}
              </Field>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit" onClick={(document)=>onSave}>Save</Button>
              <Button size="small" onClick={handleModalClose}>Cancel</Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    )}
  </Form>
);

export default compose(
  withStyles(styles),
)(DocumentForm);
