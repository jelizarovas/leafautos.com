import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Link, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import {
  MdArrowBack,
  MdArrowForward,
  MdDownload,
  MdFullscreen,
} from "react-icons/md";
import ImageGallery from "react-image-gallery";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

export const VehiclePage = (props) => {
  const [vehicle, setVehicle] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [lightBox, setLightBox] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(1);
  const refImg = React.useRef(null);

  let { vehicleId } = useParams();

  React.useEffect(() => {
    let isApiSubscribed = true;

    const getVehicle = async () => {
      setLoading(true);
      const data = await getDoc(doc(db, "vehicles", vehicleId));
      if (data) {
        const v = data.data();
        setVehicle({ ...v, id: data.id });
      }
      setLoading(false);
    };

    if (isApiSubscribed && vehicleId) {
      console.log("Getting vehicle: ", vehicleId);
      getVehicle();
    }

    return () => {
      isApiSubscribed = false;
    };
  }, [vehicleId]);

  if (loading || !vehicle)
    return (
      <div className="flex-grow flex items-center  flex-col justify-center ">
        <Loading color="black" />
      </div>
    );

  return (
    <div key={vehicleId} className="container mx-auto flex-grow flex flex-col">
      {vehicle?.imgOrder && vehicle?.images && (
        <PreviewImages
          imgOrder={vehicle?.imgOrder}
          images={vehicle?.images}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          setLightBox={setLightBox}
          lightBox={lightBox}
        />
      )}
      <div className="title text-left flex space-x-2 items-center   px-4 mt-4 uppercase text-xl font-thin border-b">
        <Link
          className="flex space-x-2 items-center border border-white rounded px-4 py-2 hover:bg-white transition-all hover:text-black"
          to="/"
        >
          <MdArrowBack />
        </Link>
        <h1 className="">{`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}</h1>
      </div>
      <div className="text-left flex-grow h-full flex flex-col md:flex-row pb-10 ">
        <List name="Photos">
          <Photos
            refImg={refImg}
            onClick={() => {
              setImageIndex(refImg.current.getCurrentIndex());
              setLightBox(true);
            }}
            images={
              vehicle?.imgOrder &&
              vehicle.imgOrder.map((imageId) => ({
                original:
                  vehicle?.images[imageId]?.thumbs?.[1]?.url ||
                  vehicle?.images[imageId]?.thumbs?.[0]?.url,
                thumbnail: vehicle?.images[imageId]?.thumbs?.[0]?.url,
              }))
            }
          />
          <div className="flex flex-wrap w-full md:w-96 items-center justify-start ">
            {vehicle?.imgOrder &&
              vehicle.imgOrder.map((imageId, index) => {
                if (!vehicle.images[imageId]?.isPublic) return null;

                return (
                  <div
                    key={imageId}
                    onClick={() => refImg.current.slideToIndex(index)}
                    style={{
                      backgroundImage: `url(${vehicle.images[imageId]?.thumbs?.[0]?.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    alt=""
                    className="w-1/6 md:w-1/5 p-1   h-16 border-2  
                       
                       border-white hover:border-yellow-500
                     "
                  ></div>
                );
              })}
          </div>
        </List>
        <div className="flex flex-col justify-start">
          <List name="Details">
            <ListItem label="Mileage" value={vehicle?.mileage} />
            <ListItem label="Series" value={vehicle?.series} />
            <ListItem label="Trim" value={vehicle?.trim} />
            <ListItem label="VIN" value={vehicle?.vin} />
            <ListItem
              label="Selling Price"
              value={"$" + vehicle?.sellingPrice}
            />
          </List>
          <List name="Exterior">
            <ListItem label="Color" value={vehicle?.exteriorColor} />
            <ListItem label="Body" value={vehicle?.body} />
            <ListItem label="Wheels" value={vehicle?.wheels} />
            <ListItem label="Doors" value={vehicle?.doors} />
          </List>
          <List name="Interior">
            <ListItem label="Type" value={vehicle?.interiorType} />
            <ListItem label="Color" value={vehicle?.interiorColor} />
            <ListItem label="Seats" value={vehicle?.seats} />
          </List>
          <List name="PowerTrain">
            <ListItem label="HorsePower" value={vehicle?.engineHP} />
            <ListItem
              label="Engine Cylinders"
              value={vehicle?.endgineCylinders}
            />
            <ListItem label="Engine CC" value={vehicle?.engineCC} />
            <ListItem label="Drive Type" value={vehicle?.driveType} />
            <ListItem label="Transmission Type" value={vehicle?.transmission} />
            <ListItem
              label="Transmission Speeds"
              value={vehicle?.transmissionSpeeds}
            />
            <ListItem label="KW" value={vehicle?.engineKW} />
            <ListItem label="Fuel Type" value={vehicle?.fuelType} />
          </List>
          {vehicle?.showHistory && (
            <List name="Description">
              <ListItem label="Owners" value={vehicle?.ownerCount} />
              <ListItem label="Accidents" value={vehicle?.accidentCount} />
            </List>
          )}
          {vehicle?.description && (
            <List name="Description">
              <Description value={vehicle?.description} />
            </List>
          )}
        </div>
      </div>
      <p className="text-xs font-light text-left py-2 px-4">
        The price listed for this vehicle does not include charges such as:
        License, Title, Registration Fees, State or Local Taxes. A dealer
        documentary service fee of up to $150 may be added to the sale price or
        capitalized cost.
      </p>
    </div>
  );
};

const ListItem = ({ label, Icon, value, ...props }) => {
  if (!value) return null;
  return (
    <li className="text-sm font-sans ">
      <span className="font-light">{label}</span> : {value}
    </li>
  );
};

const Description = ({ value, ...props }) => {
  if (!value) return null;
  return (
    <li className="text-sm font-sans ">
      <span className="font-light  whitespace-pre">{value}</span>
    </li>
  );
};

const List = ({ name, ...props }) => (
  <div className="mx-4 my-2 ">
    <h3 className="uppercase font-bold text-xs mt-4 mb-2 ">{name}</h3>
    <ul>{props.children}</ul>
  </div>
);

const Photos = ({ images, refImg, onClick }) => {
  return (
    <div className="w-full md:w-96">
      <ImageGallery
        ref={refImg}
        onClick={onClick}
        showPlayButton={false}
        showBullets={false}
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        renderLeftNav={(onClick, disabled) => (
          <MdArrowBack
            className="absolute top-1/2 z-10 left-1 p-1 text-2xl text-white bg-black bg-opacity-75 cursor-pointer hover:bg-opacity-95 transition-all hover:p-0.5"
            onClick={onClick}
            disabled={disabled}
          />
        )}
        renderRightNav={(onClick, disabled) => (
          <MdArrowForward
            className="text-2xl  p-1 absolute top-1/2 right-1 z-10 text-white bg-black bg-opacity-75 cursor-pointer hover:bg-opacity-95 transition-all hover:p-0.5"
            onClick={onClick}
            disabled={disabled}
          />
        )}
        renderFullscreenButton={(onClick, isFullscreen) => (
          <MdFullscreen
            className="text-2xl  p-1 absolute  right-1 bottom-1 z-10 text-white bg-black bg-opacity-75 cursor-pointer hover:bg-opacity-95 transition-all hover:p-0.5"
            onClick={onClick}
            isFullscreen={isFullscreen}
          />
        )}
      />
    </div>
  );
};

const PreviewImages = ({
  lightBox,
  setLightBox,
  imageIndex = 0,
  setImageIndex,
  images: i,
  imgOrder,
}) => {
  const [images] = React.useState(
    imgOrder.map((imageId) => [
      i[imageId]?.thumbs?.[2]?.url ||
        i[imageId]?.thumbs?.[1]?.url ||
        i[imageId]?.url,
      i[imageId]?.thumbs?.[0]?.url,
    ])
  );

  if (!lightBox) return null;
  // console.log(images);
  return (
    <Lightbox
      mainSrc={images[imageIndex][0]}
      mainSrcThumbnail={images[imageIndex][1]}
      nextSrc={images[(imageIndex + 1) % images.length][0]}
      nextSrcThumbnail={images[(imageIndex + 1) % images.length][1]}
      prevSrc={images[(imageIndex + images.length - 1) % images.length][0]}
      prevSrcThumbnail={
        images[(imageIndex + images.length - 1) % images.length][1]
      }
      onCloseRequest={() => setLightBox(false)}
      onMovePrevRequest={() =>
        setImageIndex((n) => (n + images.length - 1) % images.length)
      }
      onMoveNextRequest={() => setImageIndex((n) => (n + 1) % images.length)}
      toolbarButtons={[
        <a
          href={images[imageIndex][0]}
          download
          target="_blank"
          className="text-3xl  px-1 mx-1 h-9 flex opacity-60 hover:opacity-100 transition-all"
          rel="noreferrer"
        >
          <MdDownload />
        </a>,
      ]}
    />
  );
};
