
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

const LogInForm = ({ user, onSave }) => (
  <Form initialValues={user} onSubmit={onSave}>
    {({ handleSubmit }) => (
        <Card >
          <form onSubmit={handleSubmit}>
            <CardContent >
              <Field name="username">
                {({ input }) => <TextField label="username" autoFocus {...input} />}
              </Field>
              <div></div>
              <Field name="password">
                {({ input }) => <TextField label="password" autoFocus {...input} />}
              </Field>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit" onClick={(document)=>onSave}>Submit</Button>
            </CardActions>
          </form>
        </Card>
    )}
  </Form>
);

export default LogInForm;
