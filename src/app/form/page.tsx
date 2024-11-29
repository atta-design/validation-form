"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { Calendar } from "@react-shamsi/calendar";
import "@react-shamsi/calendar/dist/styles.css";
import moment from "moment-jalaali"; // Import moment-jalaali

const schema = yup.object().shape({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  phoneNumber: yup
    .string()
    .required("شماره تلفن الزامی است")
    .matches(
      /^(\+98|0)?9\d{9}$/,
      "شماره تلفن باید یک شماره موبایل معتبر ایرانی باشد"
    ),
    email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
  gender: yup.string().required("جنسیت الزامی است"),
  militaryStatus: yup.string().required("وضعیت نظام وظیفه الزامی است"),
  file: yup
  .mixed()
  .test(
    "required",
    "آپلود فایل الزامی است",
    (value) => Array.isArray(value) && value.length > 0 // Check if value is an array
  ),
});

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
    gender: "",
    militaryStatus: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/pdf': ['.pdf'], 
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'] 
    },
    maxFiles: 1,
  });

  type FormData = yup.InferType<typeof schema>;

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    console.log("Uploaded file:", uploadedFile);
  };

  const handleCalendarDateChange = (date: string) => {
    // Convert the Gregorian date to Jalali format using moment-jalaali
    const jalaliDate = moment(date).format("jYYYY/jMM/jDD");
    
    // Update the formData state and react-hook-form value when the date is selected
    setFormData((prev) => ({ ...prev, birthDate: jalaliDate }));
    setValue("birthDate", jalaliDate); // Update react-hook-form value
   // Close the calendar after date selection
  };

  const handleOpenCalendar = () => {
    setIsCalendarVisible((prev) => !prev); // Toggle calendar visibility
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50"
    
    >
      <div
    className="absolute inset-0 bg-white"
    style={{
      background: "#e8e8e8",
    }}
  />
  <div
    className="absolute rounded-full bg-[#2a0478] opacity-50 blur-3xl"
    style={{
      width: "400px",
      height: "500px",
      boxShadow: '0 0 1000px 5px rgba(0, 0, 0, 0.2)',
      top: "50%",
      right: "10%",
      transform: "translate(50%, -50%)",
      animation: "moveBlur 1s infinite alternate ease-in-out",
    }}
  />
      <form
        className="w-full h-full bg-white p-8 shadow-md border border-gray-300 flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
      >
       

        <div className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="relative flex flex-col">
            
            <input
              id="fullName"
              {...register("fullName")}
              value={formData.fullName}
              onChange={handleChange}
              className={`peer p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="fullName"
              className={`absolute right-3 ${
                formData.fullName
                  ? "top-5/2 text-indigo-600 text-sm"
                  : "top-1/2 transform -translate-y-1/2 text-gray-500"
              } transition-all duration-200`}
            >
              نام و نام خانوادگی
            </label>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative flex flex-col">
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`peer p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="phoneNumber"
              className={`absolute right-3 ${
                formData.phoneNumber
                  ? "top-5/2 text-indigo-600 text-sm"
                  : "top-1/2 transform -translate-y-1/2 text-gray-500"
              } transition-all duration-200`}
            >
              شماره تلفن
            </label>
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative flex flex-col">
            <input
              id="email"
              {...register("email")}
              value={formData.email}
              onChange={handleChange}
              className={`peer p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={`absolute right-3 ${
                formData.email
                  ? "top-5/2 text-indigo-600 text-sm"
                  : "top-1/3 transform -translate-y-1/2 text-gray-500"
              } transition-all duration-200`}
            >
              ایمیل
            </label>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Birth Date */}
          <div className="relative flex flex-col">
            <input
              id="birthDate"
              type="text"
              {...register("birthDate")}
              value={formData.birthDate}
              onChange={handleChange}
              className={`peer p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.birthDate ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="birthDate"
              className={`absolute right-3 ${
                formData.birthDate
                  ? "top-3/2 text-indigo-600 text-sm"
                  : "top-1/3 transform -translate-y-1/2 text-gray-500"
              } transition-all duration-200`}
            >
             تاریخ تولد
            </label>
            {errors.birthDate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.birthDate.message}
              </p>
            )}

            {/* Button to toggle calendar visibility */}
            <button
              type="button"
              onClick={handleOpenCalendar}
              className="mt-0 p-1 w-20 bg-indigo-600 text-white rounded-md text-sm"
            >
              {isCalendarVisible ? "بستن تقویم" : "باز کردن تقویم"}
            </button>

            {/* Show Calendar when button is clicked */}
            {isCalendarVisible && (
              <div className="absolute top-full mt-2 z-40">
                <Calendar
                  value={formData.birthDate}
                  onChange={handleCalendarDateChange} // Update form data on date change
                />
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="relative flex flex-col">
            <select
              id="gender"
              {...register("gender")}
              value={formData.gender}
              onChange={handleChange}
              className={`peer p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <option value="">انتخاب جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Military Status */}
          <div className="relative flex flex-col">
            <select
              id="militaryStatus"
              {...register("militaryStatus")}
              value={formData.militaryStatus}
              onChange={handleChange}
              className={`peer p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 ${
                errors.militaryStatus ? "border-red-500" : ""
              }`}
            >
              <option value="">وضعیت نظام وظیفه</option>
              <option value="completed">تمام شده</option>
              <option value="exempted">معاف</option>
              <option value="notCompleted">تمام نشده</option>
            </select>
            {errors.militaryStatus && (
              <p className="text-xs text-red-500 mt-1">
                {errors.militaryStatus.message}
              </p>
            )}
          </div>

          {/* File Upload */}
        
        </div>
        <div className="relative flex flex-col mt-3">
  <div
    {...getRootProps()}
    className={`border p-6 rounded-md border-gray-300 bg-white 
      flex items-center justify-center text-center transition-all duration-200
      h-32 w-full hover:shadow-lg`}
  >
    <input {...getInputProps()} />
    {isDragActive ? (
      <p className="text-gray-600">درگ کنید و رها کنید...</p>
    ) : (
      <p className="text-gray-600">
        فایل خود را انتخاب کنید یا درگ کنید و رها کنید
      </p>
    )}
  </div>
  {uploadedFile && (
    <div className="mt-4 text-sm text-gray-700">
      <p>
        <strong>فایل آپلود شده:</strong> {uploadedFile.name}
      </p>
      <p>
        <strong>حجم:</strong> {(uploadedFile.size / 1024).toFixed(2)} KB
      </p>
    </div>
  )}
  {errors.file && (
    <p className="text-xs text-red-500 mt-1">{errors.file.message}</p>
  )}
   <button
          type="submit"
          className="mt-10 p-3 w-20 bg-indigo-600 text-white rounded-md"
        >
         ارسال
        </button>
</div>
    
       
      </form>
      <style>
    {`
      @keyframes moveBlur {
        0% {
          transform: translate(50%, -50%);
        }
        100% {
          transform: translate(45%, -55%);
        }
      }
    `}
  </style>
    </div>
  );
};

export default Home;
