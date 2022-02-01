import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

interface FromTypes {
  onSubmit?: Function;
  methods: any;
  children: any;
  className?: string;
}

const Form: FC<FromTypes> = ({ children, onSubmit, methods, className }) => {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children({ ...methods })}
      </form>
    </FormProvider>
  );
};

export default Form;
