import React from "react";
import { useForm } from 'react-hook-form';

export const NewTask = () =>{
    const { register,handleSubmit } = useForm();

    const onSubmit = (data) =>{
        console.log("TODO//SWEETALERT "+data.title);
    }


    
    return (
        <div className="principal">
            <form onSubmit={handleSubmit(onSubmit)} className="form" >
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" {...register("title")} className="formulario mb-2 text-center" />
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" {...register("description")} className="formulario mb-2 text-center" />
                    <label htmlFor="date">Date</label>
                    <input type="datetime" name="date" {...register("date")} className="formulario mb-2 text-center" />
                    <button type="submit" className='btn btn-success mb-2'>Send</button>
                </div>
            </form>
        </div>
    )
}