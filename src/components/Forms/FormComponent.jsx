import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { LoadingSpinner } from "../LoadingSpinner";


const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Minimum 2 symbols!')
      .max(5, 'Maximum 7 symbols!')
      .required('Required'),
    name: Yup.string().email('Invalid email').required('Required'),
  });

export const FormComponent = ({submit, btn, loadingProcess}) => {

            return (
              (loadingProcess === "loading") ? <LoadingSpinner/> :
                     <div className="main-form">
                            <Formik 
                            initialValues={{name:'',password:''}}
                            validationSchema={SignupSchema}
                              onSubmit={(values, {setSubmitting})=>{
                                setTimeout(() => {
                                    submit(values);
                                    setSubmitting(false);
                                }, 500);
                              }}
                            >    
                          {({ isSubmitting }) => (
                            <Form>
                              <label htmlFor="name">email</label> 
                              <ErrorMessage name="name" component="div" className='error'/>
                              <Field className="input" type="email" name="name" />
                              <label htmlFor="password">password</label> 
                              <ErrorMessage name="password" component="div" className='error'/>
                              <Field className="input" type="password" name="password" />
                              <div className="button d-flex justify-end">
                                <button className="buttonPopup greenButton"
                                type="submit" disabled={isSubmitting}>
                                {btn}
                              </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                  </div>
                );
        } 
