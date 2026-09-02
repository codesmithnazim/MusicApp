import { useRef } from "react";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { LuCloudUpload } from "react-icons/lu";
import { useState } from "react";
import songsServis from "../../services/songs.servis";

function UploadSong() {
  const { isDark } = useThemeContext();
  const songInputRef = useRef();
  const coverPicInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [songInfo, setSongInfo] = useState("");
  const [coverPicName, setCoverPicName] = useState("");
  const handleSongSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSongInfo(file.name);
    }
    console.log("the uploaded naath or song info ", file);
  };

  const handlePictureSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPicName(file.name);
    }
    console.log("the uploaded naath or song cover picture information ", file);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const songData = new FormData(e.currentTarget);
      console.log("the song data = ", songData);
      const uploadedSong = await songsServis.uploadSong(songData);
      console.log(
        "Response from the backend containig the successfully stored song detail ",
        uploadedSong,
      );
    } catch (error) {
      console.log(
        "error came during uploading a song ",
        error.response.data.error,
      );
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center box-border py-10 ">
      <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
        {/* Song Upload  */}

        <div
          className={`${isDark ? "dark" : ""} songUploader w-225 flex flex-col justify-center items-center py-60 border-dashed border-2 border-muted  relative cursor-pointer  hover:border-primary  hover:opacity-60 hover:blur-[0.5px]`}
          onClick={() => songInputRef.current.click()} // songInputRef.current have the input tag, so we are calling the onclick of that input here.
        >
          <img
            src="../../../public/Upload Music.png"
            alt="the songs upload png"
            className="w-20 h-20"
          />
          <button type="button">Choose Song</button>

          <input
            type="file"
            name="musicFile"
            accept="audio/*"
            ref={songInputRef} // We're making the reference of this input equal to the reference stored in the songInputRef varibale.
            style={{ display: "none" }}
            onChange={handleSongSelect}
          />
        <p className={`${songInfo ? "" : "hidden"} text-primary`}>{songInfo}</p>
        </div>

        {/* Song cover picture upload */}
        <div
          className={`${isDark ? "dark" : ""} songUploader w-225 py-20 border-dashed border-2 border-muted  relative cursor-pointer mb-10 hover:border-primary  hover:opacity-60 hover:blur-[0.5px] flex flex-col items-center`}
          onClick={() => coverPicInputRef.current.click()} // coverPicInputRef.current have the input tag, so we are calling the onclick of that input here.
        >
          <img
            src="../../../public/Upload Music.png"
            alt="the songs upload png"
            className="w-10 h-10"
          />
          <button type="button">Song Cover image</button>

          <input
            type="file"
            name="musicFile"
            accept="image/*"
            ref={coverPicInputRef} // We're making the reference of this input equal to the reference stored in the coverPicInputRef varibale.
            style={{ display: "none" }}
            onChange={handlePictureSelect}
          />
        <p className={`${coverPicName ? "" : "hidden"} text-primary`}>{coverPicName}</p>
        </div>

        {/* Div for inputting the track title */}
        <div className="username flex flex-col gap-1">
          <label
            htmlFor="username"
            className={`${isDark ? "dark" : ""} text-foreground font-normal`}
          >
            Track title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={5}
            className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary "
          />
          <span className={`${isDark ? "dark" : ""} text-sm text-olive-500 `}>
            {"Tip: Use commas to add multiple artist names."}
          </span>
        </div>

        {/* Div for inputting the artist name */}
        <div className="username flex flex-col gap-1">
          <label
            htmlFor="username"
            className={`${isDark ? "dark" : ""} text-foreground font-normal`}
          >
            Artist name
          </label>
          <input
            id="artist"
            name="artist"
            type="text"
            required
            minLength={2}
            className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary"
          />
        </div>

        {/* div for inputting the Genre of the track */}
        <div className="username flex flex-col gap-1">
          <label
            htmlFor="genre"
            className={`${isDark ? "dark" : ""} text-foreground font-normal`}
          >
            Select a Genre
          </label>
          <select
            name="genre"
            id="cars"
            className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary text-zinc-500"
          >
            <option
              value=""
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              Search for genre
            </option>
            <option
              value="volvo"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              Classical
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Dance
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Deep House
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Disco
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Drum & Base
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Electronic
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Folk & Singer Song-writer
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Latin
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Metal
            </option>
            <option
              value="audi"
              className={`${isDark ? "dark" : ""} bg-background text-foreground`}
            >
              {" "}
              Indie
            </option>
          </select>

          {/* <label htmlFor="username" >
            Genre
          </label>
          <input
            id="Genre"
            name="genre"
            type=""
            required
            minLength={3}
            className=""
          /> */}
        </div>

        {/* div for inputting the description of the track */}
        <div className="username flex flex-col gap-1.5">
          <label
            htmlFor="username"
            className={`${isDark ? "dark" : ""} text-foreground font-normal`}
          >
            Description
          </label>
          <input
            id="artist"
            name="artist"
            type="text"
            required
            minLength={2}
            className={` ${isDark ? "dark" : ""} border-b-3 border-b-muted outline-none focus:border-b-foreground hover:border-b-foreground placeholder:text-muted `}
            placeholder="tracks with descriptions tend to get more plays and engagements "
          />
        </div>

        <div className={`${errorMessage ? "" : "hidden"} text-sm text-red-700`}>
          {" "}
          {errorMessage}
        </div>

        <button
          type="submit"
          className={`${isDark ? "dark" : ""} px-6 py-2 bg-primary border-2 border-zinc-300 text-white rounded-2xl flex justify-center items-center self-end mt-10 cursor-pointer`}
        >
          <LuCloudUpload size={20} />
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadSong;
