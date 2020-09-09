// export const handleChangeHikingBuddyZip = (evt, hikingBuddyInfo,setHikingBuddyInfo) => {
//     const addHikingZip = hikingBuddyInfo
//     addHikingZip.zip = evt.target.value
//     setHikingBuddyInfo(addHikingZip)

//   }

// export const handleChangeHikingBuddyDate = (evt, hikingBuddyInfo, setHikingBuddyInfo) => {
//     const addHikingDate = hikingBuddyInfo
//     addHikingDate.date = evt.target.value
//     setHikingBuddyInfo(addHikingDate)
//     console.log(hikingBuddyInfo)
//   }

// export const handleSubmitHikingBuddy = (evt, setHikingBuddyVisible, setHikingBuddyEntries, hikingBuddyInfo, hikingBuddyEntries, setHikingBuddyInfo) => {
//     evt.preventDefault();
//     setHikingBuddyVisible(true)
//     setHikingBuddyEntries([...hikingBuddyEntries, hikingBuddyInfo])
//     setHikingBuddyInfo({})

//   }

export  const handleChange = (evt, setSearchZip) => {
    setSearchZip(evt.target.value)

  }

export const handleSubmit = (evt) => {
    evt.preventDefault();

  }