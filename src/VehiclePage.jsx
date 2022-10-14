import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { useParams } from "react-router-dom";

export const VehiclePage = (props) => {
  const [vehicle, setVehicle] = React.useState(null);
  const [activeImageId, setActiveImageId] = React.useState(null);

  let { vehicleId } = useParams();

  React.useEffect(() => {
    const getVehicle = async () => {
      const data = await getDoc(doc(db, "vehicles", vehicleId));
      const v = data.data();
      setVehicle({ ...v, id: data.id });
      if (v?.imgOrder) setActiveImageId(v.imgOrder[0]);
    };

    if (vehicleId) {
      console.log("Getting vehicle: ", vehicleId);
      getVehicle();
    }
  }, [vehicleId]);

  if (!vehicle)
    return <div className="container mx-auto flex py-10">Loading...</div>;

  return (
    <div className="text-left container mx-auto flex flex-col md:flex-row pb-10">
      <List name="Photos">
        <div
          style={{
            backgroundImage: `url(${
              vehicle?.images[activeImageId]?.thumbs?.[1]?.url ||
              vehicle?.images[activeImageId]?.thumbs?.[0]?.url
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          alt=""
          className="m-0.5 w-full md:w-96 h-96  "
        ></div>
        <div className="flex flex-wrap md:w-96 ">
          {vehicle?.imgOrder &&
            vehicle.imgOrder.map((imageId) => (
              <div
                key={imageId}
                onClick={() => setActiveImageId(imageId)}
                style={{
                  backgroundImage: `url(${vehicle.images[imageId]?.thumbs?.[0]?.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                alt=""
                className="m-0.5 w-16 h-16 hover:border-2 border-yellow-500 "
              ></div>
            ))}
        </div>
      </List>
      <div className="flex flex-col md:flex-row lg:flex-col justify-center">
        <List name={`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}>
          <ListItem label="Mileage" value={vehicle?.mileage} />
          <ListItem label="Series" value={vehicle?.series} />
          <ListItem label="Trim" value={vehicle?.trim} />
          <ListItem label="VIN" value={vehicle?.vin} />
          <ListItem label="Selling Price" value={vehicle?.sellingPrice} />
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
        {vehicle?.description && (
          <List name="Description">
            <Description value={vehicle?.description} />
          </List>
        )}
      </div>
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

// const sample = {
//   wheels: "",
//   exteriorColor: "RED",
//   seats: "",
//   interiorColor: "BLACK",
//   isPublic: true,
//   interiorType: "LEATHER",
//   model: "CAMARO",
//   year: "1995",
//   engineHP: "",
//   vin: "2G1FP22P6S2178808",
//   transmission: "AUTOMATIC",
//   engineKW: "",
//   mainImgId: "cl881adoe0004356mhktzmfk5",
//   buyingDate: "",
//   doors: "4",
//   transmissionSpeeds: "",
//   images: {
//     cl881adof0008356mw1bbz5g0: {
//       completed: true,
//       fileName: "IMG_20220805_192359.jpg",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adof0008356mw1bbz5g0%2FIMG_20220805_192359.jpg?alt=media&token=9f2a41cd-7eb6-4502-b4c3-d063342dcb59",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adof0008356mw1bbz5g0/thumb_001_IMG_20220805_192359.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adof0008356mw1bbz5g0%2Fthumb_001_IMG_20220805_192359.jpg?alt=media&token=cl881bbue000001s695hcas27",
//         },
//       ],
//       type: "image/jpeg",
//       isPublic: true,
//       size: 4047978,
//       status: "Completed",
//       failed: false,
//     },
//     cl881adoh000d356mv0hjm2jn: {
//       type: "image/jpeg",
//       status: "Completed",
//       failed: false,
//       isPublic: true,
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoh000d356mv0hjm2jn%2FIMG_20220805_192437.jpg?alt=media&token=fa87d090-f8c7-4b50-b075-1dfbbb79a545",
//       size: 3087867,
//       fileName: "IMG_20220805_192437.jpg",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       completed: true,
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoh000d356mv0hjm2jn%2Fthumb_001_IMG_20220805_192437.jpg?alt=media&token=cl881b5gm000201s69m2t48gz",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoh000d356mv0hjm2jn/thumb_001_IMG_20220805_192437.jpg",
//         },
//       ],
//     },
//     cl881adod0002356mhdw77t7q: {
//       completed: true,
//       fileName: "IMG_20220805_192255.jpg",
//       size: 4953030,
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adod0002356mhdw77t7q%2Fthumb_001_IMG_20220805_192255.jpg?alt=media&token=cl881baoi000a01s6832g3pqe",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adod0002356mhdw77t7q/thumb_001_IMG_20220805_192255.jpg",
//         },
//       ],
//       status: "Completed",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adod0002356mhdw77t7q%2FIMG_20220805_192255.jpg?alt=media&token=df87da58-8404-4934-aca5-724f0fe67d5f",
//       isPublic: true,
//       main: true,
//       type: "image/jpeg",
//       failed: false,
//     },
//     cl881adog000a356m92a0563t: {
//       fileName: "IMG_20220805_192416.jpg",
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adog000a356m92a0563t/thumb_001_IMG_20220805_192416.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adog000a356m92a0563t%2Fthumb_001_IMG_20220805_192416.jpg?alt=media&token=cl881b9ik000901s69pwhhtcp",
//         },
//       ],
//       status: "Completed",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adog000a356m92a0563t%2FIMG_20220805_192416.jpg?alt=media&token=6324bf3e-a0ca-467c-a43b-c76994f0e3b4",
//       failed: false,
//       size: 4058327,
//       type: "image/jpeg",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       completed: true,
//       isPublic: true,
//     },
//     cl881adoh000e356mao4ql2nk: {
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoh000e356mao4ql2nk%2FIMG_20220805_192443.jpg?alt=media&token=02d01b2f-8ee9-4476-a9ef-ba013cd4b302",
//       size: 6341898,
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoh000e356mao4ql2nk%2Fthumb_001_IMG_20220805_192443.jpg?alt=media&token=cl881bclc000101s66723656l",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoh000e356mao4ql2nk/thumb_001_IMG_20220805_192443.jpg",
//         },
//       ],
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       isPublic: true,
//       fileName: "IMG_20220805_192443.jpg",
//       type: "image/jpeg",
//       status: "Completed",
//       completed: true,
//       failed: false,
//     },
//     cl881adof0007356mxj3wr0xb: {
//       type: "image/jpeg",
//       failed: false,
//       fileName: "IMG_20220805_192350.jpg",
//       status: "Completed",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adof0007356mxj3wr0xb%2FIMG_20220805_192350.jpg?alt=media&token=e016e774-49c9-4192-b8b8-7c69ab761f8d",
//       isPublic: true,
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adof0007356mxj3wr0xb/thumb_001_IMG_20220805_192350.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adof0007356mxj3wr0xb%2Fthumb_001_IMG_20220805_192350.jpg?alt=media&token=cl881bc2f000b01s634sccoi7",
//         },
//       ],
//       completed: true,
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       size: 4915256,
//     },
//     cl881adoe0005356mq0jpxqtb: {
//       failed: false,
//       completed: true,
//       fileName: "IMG_20220805_192325.jpg",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoe0005356mq0jpxqtb%2FIMG_20220805_192325.jpg?alt=media&token=a1d8f4e5-9bd0-421a-8f51-e1341460513b",
//       isPublic: true,
//       size: 6813942,
//       type: "image/jpeg",
//       status: "Completed",
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoe0005356mq0jpxqtb/thumb_001_IMG_20220805_192325.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoe0005356mq0jpxqtb%2Fthumb_001_IMG_20220805_192325.jpg?alt=media&token=cl881bcfi000701s6cjha2exn",
//         },
//       ],
//     },
//     cl881adoi000g356mxeoyig63: {
//       isPublic: true,
//       completed: true,
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoi000g356mxeoyig63%2FIMG_20220805_192527.jpg?alt=media&token=adf67e6c-ba5a-41f9-beed-6b346545fd07",
//       failed: false,
//       type: "image/jpeg",
//       status: "Completed",
//       fileName: "IMG_20220805_192527.jpg",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoi000g356mxeoyig63/thumb_001_IMG_20220805_192527.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoi000g356mxeoyig63%2Fthumb_001_IMG_20220805_192527.jpg?alt=media&token=cl881bc1b000201s62x207dv2",
//         },
//       ],
//       size: 5549302,
//     },
//     cl881adof0006356m1kw426fv: {
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adof0006356m1kw426fv%2FIMG_20220805_192340.jpg?alt=media&token=fbdae19b-5056-48a5-9315-67f54d846491",
//       status: "Completed",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       type: "image/jpeg",
//       isPublic: true,
//       fileName: "IMG_20220805_192340.jpg",
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adof0006356m1kw426fv%2Fthumb_001_IMG_20220805_192340.jpg?alt=media&token=cl881bb9b000601s62gpo7c6e",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adof0006356m1kw426fv/thumb_001_IMG_20220805_192340.jpg",
//         },
//       ],
//       size: 5054461,
//       completed: true,
//       failed: false,
//     },
//     cl881adoe0004356mhktzmfk5: {
//       status: "Completed",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoe0004356mhktzmfk5%2FIMG_20220805_192316.jpg?alt=media&token=e9a8d19c-ffa9-4191-9f76-b369821d561e",
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoe0004356mhktzmfk5/thumb_001_IMG_20220805_192316.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoe0004356mhktzmfk5%2Fthumb_001_IMG_20220805_192316.jpg?alt=media&token=cl881bbvd000301s6cfgn33e1",
//         },
//       ],
//       completed: true,
//       isPublic: true,
//       failed: false,
//       type: "image/jpeg",
//       size: 5586679,
//       fileName: "IMG_20220805_192316.jpg",
//     },
//     cl881adog0009356momutjnnc: {
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adog0009356momutjnnc%2FIMG_20220805_192409.jpg?alt=media&token=91a796b1-3780-4c28-aec2-85dae93a3069",
//       fileName: "IMG_20220805_192409.jpg",
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adog0009356momutjnnc%2Fthumb_001_IMG_20220805_192409.jpg?alt=media&token=cl881be3w000001s6hpr2epxh",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adog0009356momutjnnc/thumb_001_IMG_20220805_192409.jpg",
//         },
//       ],
//       failed: false,
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       status: "Completed",
//       type: "image/jpeg",
//       completed: true,
//       isPublic: true,
//       size: 5182474,
//     },
//     cl881adog000b356m40hpxrs3: {
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adog000b356m40hpxrs3%2FIMG_20220805_192427.jpg?alt=media&token=01626bb1-3168-4851-9e52-1080b8180a1f",
//       status: "Completed",
//       thumbs: [
//         {
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adog000b356m40hpxrs3/thumb_001_IMG_20220805_192427.jpg",
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adog000b356m40hpxrs3%2Fthumb_001_IMG_20220805_192427.jpg?alt=media&token=cl881b6xr000301s60tt6hsta",
//         },
//       ],
//       failed: false,
//       isPublic: true,
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       fileName: "IMG_20220805_192427.jpg",
//       completed: true,
//       type: "image/jpeg",
//       size: 3534294,
//     },
//     cl881adoe0003356m5thqni13: {
//       fileName: "IMG_20220805_192304.jpg",
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoe0003356m5thqni13%2Fthumb_001_IMG_20220805_192304.jpg?alt=media&token=cl881ba15000501s64pn71aor",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoe0003356m5thqni13/thumb_001_IMG_20220805_192304.jpg",
//         },
//       ],
//       status: "Completed",
//       type: "image/jpeg",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoe0003356m5thqni13%2FIMG_20220805_192304.jpg?alt=media&token=973fbe8b-93d8-47ed-9206-8bda3e65ef3a",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       failed: false,
//       completed: true,
//       isPublic: true,
//       size: 4521481,
//     },
//     cl881adoi000h356mzdn0mtlx: {
//       fileName: "IMG_20220805_192607.jpg",
//       status: "Completed",
//       failed: false,
//       size: 4308916,
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoi000h356mzdn0mtlx%2FIMG_20220805_192607.jpg?alt=media&token=a63f1ddf-3156-4d51-bfc2-50e80710a7b7",
//       type: "image/jpeg",
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoi000h356mzdn0mtlx%2Fthumb_001_IMG_20220805_192607.jpg?alt=media&token=cl881baq1000001s61ffu75ly",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoi000h356mzdn0mtlx/thumb_001_IMG_20220805_192607.jpg",
//         },
//       ],
//       isPublic: true,
//       completed: true,
//     },
//     cl881adoi000f356mq2yih5b7: {
//       fileName: "IMG_20220805_192522.jpg",
//       isPublic: true,
//       size: 3019856,
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoi000f356mq2yih5b7%2Fthumb_001_IMG_20220805_192522.jpg?alt=media&token=cl881b5fn000801s602nm4dy7",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoi000f356mq2yih5b7/thumb_001_IMG_20220805_192522.jpg",
//         },
//       ],
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoi000f356mq2yih5b7%2FIMG_20220805_192522.jpg?alt=media&token=2944197d-2136-4944-bc2d-a42b7ecb8c43",
//       completed: true,
//       status: "Completed",
//       type: "image/jpeg",
//       failed: false,
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//     },
//     cl881adoh000c356m9k8hs6bv: {
//       status: "Completed",
//       fileName: "IMG_20220805_192431.jpg",
//       size: 3949091,
//       failed: false,
//       type: "image/jpeg",
//       thumbs: [
//         {
//           url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoh000c356m9k8hs6bv%2Fthumb_001_IMG_20220805_192431.jpg?alt=media&token=cl881b8y3000401s6c3n68099",
//           storagePath:
//             "vehicles/cl4oqwgz80000356aot5sbfjh/cl881adoh000c356m9k8hs6bv/thumb_001_IMG_20220805_192431.jpg",
//         },
//       ],
//       completed: true,
//       isPublic: true,
//       storagePath: "vehicles/cl4oqwgz80000356aot5sbfjh",
//       url: "https://firebasestorage.googleapis.com/v0/b/leafautosphotos/o/vehicles%2Fcl4oqwgz80000356aot5sbfjh%2Fcl881adoh000c356m9k8hs6bv%2FIMG_20220805_192431.jpg?alt=media&token=cc42f809-05a1-4f58-b233-5f12f089afd4",
//     },
//   },
//   make: "CHEVROLET",
//   body: "Sedan/Saloon",
//   endgineCylinders: "4",
//   imgOrder: [
//     "cl881adoe0004356mhktzmfk5",
//     "cl881adoe0003356m5thqni13",
//     "cl881adod0002356mhdw77t7q",
//     "cl881adog0009356momutjnnc",
//     "cl881adof0008356mw1bbz5g0",
//     "cl881adof0007356mxj3wr0xb",
//     "cl881adof0006356m1kw426fv",
//     "cl881adoe0005356mq0jpxqtb",
//     "cl881adog000b356m40hpxrs3",
//     "cl881adoi000f356mq2yih5b7",
//     "cl881adoi000g356mxeoyig63",
//     "cl881adoh000d356mv0hjm2jn",
//     "cl881adoh000e356mao4ql2nk",
//     "cl881adoh000c356m9k8hs6bv",
//     "cl881adog000a356m92a0563t",
//     "cl881adoi000h356mzdn0mtlx",
//   ],
//   mileage: "123000",
//   sellingPrice: "5000",
//   series: "CLA250 4MATIC",
//   trim: "Z28",
//   engineCC: "2000.0",
//   buyingPrice: "",
//   driveType: "AWD/All-Wheel Drive",
//   transmissionStyle: "",
//   fuelType: "Gasoline",
//   id: "cl4oqwgz80000356aot5sbfjh",
// };
