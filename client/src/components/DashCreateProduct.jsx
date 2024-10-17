import { Alert, Button, FileInput, Select,Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const DashCreateProduct = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publish, setPublish] = useState(false)
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    setPublish(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        setPublish(false)
        return;
      }
      if(res.ok){
        setPublishError(null);
        setPublish(false)

        // navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something went wrong')
      setPublish(false)

    }
  };

  return (
    <div className="min-h-screen p-3 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a product
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4  justify-between">
          <TextInput
            type="text"
            placeholder="Name"
            required
            id="name"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <TextInput
            type="number"
            placeholder="Old price"
            required
            id="old_price"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, old_price: e.target.value });
            }}
          />
          <TextInput
            type="text"
            placeholder="New price"
            required
            id="new_price"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, new_price: e.target.value });
            }}
          />
          <Select
          onChange={(e) => {
            setFormData({ ...formData, category: e.target.value });
          }}>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
          </Select>
        </div>
        <div className="flex p-3 items-center gap-4 justify-between border-4 border-teal-500 border-dashed">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            size="sm"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-contain"
          />
        )}
        <Button gradientDuoTone="purpleToPink" type="submit" disabled={publish}>
        {publish ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Publishing...</span>
                </>
              ) : (
                "Publish"
              )}
        </Button>
        {publishError && (
          <Alert className="mt-5" color='failure'> {publishError}</Alert>
        )}
      </form>
    </div>
  );
};

export default DashCreateProduct;
