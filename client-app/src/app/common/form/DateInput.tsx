import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps
  extends FieldRenderProps<Date, HTMLElement>,
    FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        value={input.value || null}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
