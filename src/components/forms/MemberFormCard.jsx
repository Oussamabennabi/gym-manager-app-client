import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberForm from "./MemberForm";
import { addMember, getMember, updateMember } from "../../services";
import { PLANS } from "../../constants";
import { formatDate } from "../../utils/formatDate";
const MemberFormCard = ({
  setModalOpen,
  fetchMembers,
  memberId,
  setMemberId,
}) => {
  // state
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountLeft, setAmountLeft] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(PLANS.oneMonth);
  const [startDate, setStartDate] = useState(formatDate(Date.now()));
  const [endDate, setEndDate] = useState(() => {
    const currentMonth = new Date();
    return new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
  });
  const [loading, setLoading] = useState(false);

  // end of state

  useEffect(() => {
    const currentMonth = new Date(startDate);
    const monthValue = selectedMembership === PLANS.oneMonth ? 1 : 2;
    const newDate = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + monthValue)
    );
    setEndDate(newDate);
  }, [startDate, selectedMembership]);

  useEffect(() => {
    // auto generate the total amount
    const amount = selectedMembership === PLANS.oneMonth ? 1500 : 2500;
    setTotalAmount(amount);
  }, [selectedMembership]);

  // amount left
  useEffect(() => {
    const amountLeft = Number(totalAmount) - Number(paidAmount);
    setAmountLeft(amountLeft);
  }, [paidAmount, totalAmount]);

  useEffect(() => {
    if (memberId == null || memberId == "") return;
    const main = async () => {
      try {
        const data = await getMember(memberId);
        setFullName(data.fullName);
        setPhoneNumber(data.phoneNumber);
        setAge(data.age);
        setPaidAmount(data.paidAmount);
        setPhoto(data.photo);
        setStartDate(data.startDate);
        setSelectedMembership(Number(data.membership?.split(" ")[0]));
      } catch (error) {
        console.log(error);
      }
    };
    main();
  }, [memberId]);

  async function getPhotoFile(name) {
    let newPhoto;
    try {
      let blob;
      if (!photo) return null;
      if (typeof photo === "object") {
        blob = photo?.slice(0, photo?.size, photo?.type);
        const photoName =
          name + "." + photo.name.substr(photo.name.lastIndexOf(".") + 1);
        newPhoto = new File([blob], photoName, { type: photo?.type });
      } else if (typeof photo === "string") {
        if (!photo.startsWith("data:image/jpeg;base64,")) return photo;
        blob = await fetch(photo).then((res) => res.blob());
        newPhoto = new File([blob], name + "." + blob.type.split("/")[1], {
          type: blob.type,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return newPhoto;
  }
  async function getFormData() {
    const formData = new FormData();

    const customId = crypto.randomUUID();

    try {
      const newPhoto = await getPhotoFile(memberId ? memberId : customId);
      if (newPhoto) {
        //  if it is not a file
        if (typeof newPhoto === "object") {
          formData.append("photoUpload", newPhoto);
          formData.append("photo", newPhoto.name);
        } else {
          const photoName =
            photo === "avatar.svg"
              ? photo
              : memberId + "." + newPhoto.split(".")[1];

          formData.append("photo", photoName);
        }
      } else {
        formData.append("photo", "avatar.svg");
      }
    } catch (error) {
      console.log(error);
    }
    formData.append("id", memberId ? memberId : customId);
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("age", age);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("totalAmount", totalAmount);
    formData.append("paidAmount", paidAmount);
    formData.append("amountLeft", amountLeft);

    formData.append(
      "membership",
      selectedMembership === PLANS.oneMonth ? "1 month" : "2 months"
    );
    return formData;
  }
  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (memberId) {
        await updateMember(memberId, await getFormData());
        setMemberId("");
      } else {
        await addMember(await getFormData());
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setModalOpen(false);
    await fetchMembers();
    onCancel();
  }

  function onCancel() {
    setSelectedMembership(PLANS.oneMonth);
    setFullName("");
    setPhoneNumber("");
    setPaidAmount(0);
    setAge(0);
    setPhoto(null);
    setModalOpen(false);
    setStartDate(new Date());
    setMemberId("");
  }

  return (
    <Box
      sx={{
        overflowY: "scroll",
        maxHeight: "80vh",
        px: "1rem",
        pb: "1rem",
      }}
    >
      <MemberForm
        state={{
          handleSubmit,
          photo,
          setPhoto,
          fullName,
          setFullName,
          phoneNumber,
          setPhoneNumber,
          age,
          setAge,
          paidAmount,
          setPaidAmount,
          totalAmount,
          setTotalAmount,
          amountLeft,
          setAmountLeft,
          showCamera,
          setShowCamera,
          selectedMembership,
          setSelectedMembership,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          loading,
          onCancel,
        }}
      />
    </Box>
  );
};

export default MemberFormCard;
