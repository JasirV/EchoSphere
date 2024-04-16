import React, { useState } from "react";
import TextInput from "./TextInput";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { BsFiletypeGif } from "react-icons/bs";
import CustomeButton from "./CustomeButton";
import Loading from "./Loading";
import { useForm } from "react-hook-form";
import NoProfile from "../assets/ProfilePng.png";
import { useNavigate } from "react-router-dom";

const ProfilePost = ({user}) => {
  const navigation = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePosrSubmit = async (data) => {};
  const [posting, setPosting] = useState(false);
  const [file, setFile] = useState("");

  return (
    <div
      className="w-full h-72 bg-bgColor flex justify-center "
      onClick={() => navigation("/home")}
    >
      <form className="bg-primary px-4 rounded-lg w-1/2 ">
        <div className="w-full flex item-center gap-2 py-4 border-b border-[#66666645]">
          <img
            src={user?.photo ?? NoProfile}
            alt="UserImage"
            className="w-14 h-14 rounded-full object-cover"
          />
          <TextInput
            styles="w-full rounded-full py-5"
            placeholder="Whats on your mind..."
            name="description"
            register={register("description", {
              required: "Write something about the post.",
            })}
            error={errors.description ? errors.description.message : ""}
          />
        </div>
        {errMsg?.message && (
          <span
            role="alert"
            className={`text-sm ${
              errMsg?.status === "fail"
                ? "text-[#f64949fe]"
                : "text-[#2ba150fe]"
            }mt-0.5`}
          >
            {errMsg?.message}
          </span>
        )}
        <div className="flex items-center justify-between py-4">
          <label
            htmlFor="imageUpload"
            className="flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer"
          >
            <BiImages />
            <span>Image</span>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              data-max-size="5120"
              accept=".jpg,.png,.jpeg"
            />
          </label>

          <label
            htmlFor="videoUpload"
            className="flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer"
          >
            <BiSolidVideo />
            <span>Video</span>
            <input
              type="file"
              id="videoUpload"
              className="hidden"
              data-max-size="5120"
              accept=".mp4,.wav"
            />
          </label>
          <label
            htmlFor="vgifUpload"
            className="flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer"
          >
            <BsFiletypeGif />
            <span>Gif </span>
            <input
              type="file"
              id="vgifUpload"
              className="hidden"
              data-max-size="5120"
              accept=".gif"
            />
          </label>
          <div>
            {posting ? (
              <Loading />
            ) : (
              <CustomeButton
                type="submit"
                titile="post"
                containerStyle="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePost;
