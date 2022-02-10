import {
  CallOutlined,
  Close,
  HomeOutlined,
  LocationCity,
  MailOutline,
  MarkunreadMailboxOutlined,
  PermIdentityOutlined
} from "@mui/icons-material"
import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateUser } from "redux/apiCalls"
import { publicRequest, userRequest } from "requestMethods"
import { mobile } from "responsive"
import Styled from "styled-components"

const Container = Styled.div`
flex: 4;
display: flex;
align-items:center;
justify-content:center;
background: darkgray;
padding: 20px;
`
const Card = Styled.div`
max-width: 570px;
width: 100vw;
display:flex;
align-items:center;
justify-content:center;
flex-direction: column;
border-radius: 5px;
box-shadow: 0 0 3px black;
${mobile({ width: "calc(100vw - 40px)" })}
`
const CardTop = Styled.div`
width: 100%;
background-image: url(${process.env.PUBLIC_URL}/assets/img/user/mockImgFeuille.jpeg);
background-size: cover;
height: 275px;
display: flex;
justify-content: center;
align-items:center;
flex-direction: column;
`
const CardTitle = Styled.h2`
color: white;
margin: 15px 0 5px;
`
const CardDate = Styled.h3`
color: #ffffffbd;
font-weight: 100;
`
const CardButton = Styled.div`
border-radius: 5px;
top: 100px;
padding: 10px 20px;
border: 1px solid #222;
color: #999;
text-align: center;
background-color: black;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
}
`
const CardBottom = Styled.div`
flex:1;
width: 100%;
height: 570px;
`
const CardBottomWrapper = Styled.div`
margin: 15px;
height: calc(100% - 30px);
`

const BottomTitle = Styled.h2`
font-weight: 400;
font-size: 26px;
font-style: normal;
margin-bottom: 25px;
`

const BottomField = Styled.div`
position: relative;`
const Label = Styled.label`
color: gray;
padding: 8px 5px;
`
const Input = Styled.input`
background:darkgray;
border: none;
border-bottom: 1px solid gray;
width: calc(100% - 10px);
padding: 8px 0;
margin: 0 5px 15px;
color: black;
font-size: 16px;
&:focus-visible {
  outline: 2px solid #4f9ae7;
}
`
const Select = Styled.select`
  background-color: darkgray;
  border:none;
  border-bottom: 1px solid gray;
  width: calc(100% - 10px);
  padding: 8px 0;
  margin: 0 5px 15px;
  color: black;
  font-size: 16px; 
  &:focus-visible {
    outline:2px solid #4f9ae7;
  }
`
const Option = Styled.option`
  
`
const StyledPermIdentityOutlined = Styled(PermIdentityOutlined)`
position: absolute;
right: 4px;
top: 50%;
transform: translateY(-50%);`

const StyledMailOutline = Styled(MailOutline)`
position: absolute;
right: 4px;
top: 50%;
transform: translateY(-50%);
`
const StyledCallOutlined = Styled(CallOutlined)`
position: absolute;
right: 4px;
top: 50%;
transform: translateY(-50%);
`
const StyledHomeOutlined = Styled(HomeOutlined)`
position: absolute;
right: 4px;
top: 50%;
transform: translateY(-50%);
`
const StyledLocationCity = Styled(LocationCity)`
position: absolute;
right: 4px;
top: 50%;
transform: translateY(-50%);
`
const StyledMarkunreadMailboxOutlined = Styled(MarkunreadMailboxOutlined)`
position: absolute;
right: 4px;
top: 50%;
transform: translateY(-50%);
`

const ModalContainer = Styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
background-color: rgba(0,0,0,0.5);
display:flex;
justify-content: center;
align-items:center;
z-index:2;
`

const Modal = Styled.div`
width: 90vw;
max-width: 300px;
height: 150px;
position: relative;
background-color:white;
display:flex;
flex-direction:column;
`
const ModalHeader = Styled.div`
flex: 0 40px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 5px;
border-bottom: 1px solid darkgrey;
`
const ModalTitle = Styled.h3`
`
const CloseModal = Styled(Close)`
&:hover {
  color: red;
  cursor: pointer;
}
`
const ModalContent = Styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
align-items:center;
flex:1;
`

const ModalInput = Styled.input`
max-width: 70%;
`
const ModalButton = Styled.button`
padding: 5px;
cursor: pointer;
`

export default function Main() {
  const [disabled, setDisabled] = useState(true)
  const [modal, setModal] = useState(false)
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalBox: "",
    createdAt: "",
    country: ""
  })
  // @ts-ignore
  const { currentUser, isFetching, error } = useSelector((state) => state.user)
  const countries = useMemo(
    () => [
      { country: "Argentina", code: "AR" },
      { country: "Australia", code: "AU" },
      { country: "Austria", code: "AT" },
      { country: "Belgium", code: "BE" },
      { country: "Bolivia", code: "BO" },
      { country: "Brazil", code: "BR" },
      { country: "Bulgaria", code: "BG" },
      { country: "Canada", code: "CA" },
      { country: "Chile", code: "CL" },
      { country: "Colombia", code: "CO" },
      { country: "Costa Rica", code: "CR" },
      { country: "Croatia", code: "HR" },
      { country: "Cyprus", code: "CY" },
      { country: "Czech Republic", code: "CZ" },
      { country: "Denmark", code: "DK" },
      { country: "Dominican Republic", code: "DO" },
      { country: "Egypt", code: "EG" },
      { country: "Estonia", code: "EE" },
      { country: "Finland", code: "FI" },
      { country: "France", code: "FR" },
      { country: "Germany", code: "DE" },
      { country: "Greece", code: "GR" },
      { country: "Hong Kong SAR China", code: "HK" },
      { country: "Hungary", code: "HU" },
      { country: "Iceland", code: "IS" },
      { country: "India", code: "IN" },
      { country: "Indonesia", code: "ID" },
      { country: "Ireland", code: "IE" },
      { country: "Israel", code: "IL" },
      { country: "Italy", code: "IT" },
      { country: "Japan", code: "JP" },
      { country: "Latvia", code: "LV" },
      { country: "Liechtenstein", code: "LI" },
      { country: "Lithuania", code: "LT" },
      { country: "Luxembourg", code: "LU" },
      { country: "Malta", code: "MT" },
      { country: "Mexico ", code: "MX" },
      { country: "Netherlands", code: "NL" },
      { country: "New Zealand", code: "NZ" },
      { country: "Norway", code: "NO" },
      { country: "Paraguay", code: "PY" },
      { country: "Peru", code: "PE" },
      { country: "Poland", code: "PL" },
      { country: "Portugal", code: "PT" },
      { country: "Romania", code: "RO" },
      { country: "Singapore", code: "SG" },
      { country: "Slovakia", code: "SK" },
      { country: "Slovenia", code: "SI" },
      { country: "Spain", code: "ES" },
      { country: "Sweden", code: "SE" },
      { country: "Switzerland", code: "CH" },
      { country: "Thailand", code: "TH" },
      { country: "Trinidad & Tobago", code: "TT" },
      { country: "United Arab Emirates", code: "AE" },
      { country: "United Kingdom", code: "GB" },
      { country: "United States", code: "US" },
      { country: "Uruguay", code: "UY" }
    ],
    []
  )
  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    postalBox,
    createdAt,
    country
  } = info
  const handleUpdate = (e) => {
    const { name: inputName, value } = e.target
    setInfo({ ...info, [inputName]: value })
  }
  useEffect(() => {
    setInfo(currentUser)
  }, [currentUser])
  console.log(info)

  const dispatch = useDispatch()
  const [modalPassword, setModalPassword] = useState("")
  const history = useHistory()
  const handleClick = () => {
    if (!disabled) setModal(true)
    setDisabled(!disabled)
  }

  const handleUpdateUser = () => {
    const user = Object.entries(currentUser)
    const newInfo = Object.entries(info).filter((x, i) =>
      x !== undefined ? x[1] !== user[i][1] : false
    )
    // @ts-ignore
    const { _id: id } = currentUser
    if (newInfo) {
      updateUser(dispatch, id, {
        ...Object.fromEntries(newInfo),
        password: modalPassword
      })
      if (!isFetching && !error) {
        setModal(false)
        setModalPassword("")
      }
    }
  }

  return (
    <Container>
      {modal && (
        <ModalContainer>
          <Modal>
            <ModalHeader>
              <ModalTitle>Confirm Your password</ModalTitle>
              <CloseModal
                onClick={() => {
                  setModal(false)
                  setModalPassword("")
                }}
              />
            </ModalHeader>
            <ModalContent>
              <ModalInput
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value.toLowerCase())}
              />
              <ModalButton onClick={handleUpdateUser}>Valider</ModalButton>
            </ModalContent>
          </Modal>
        </ModalContainer>
      )}
      <Card>
        <CardTop>
          <CardButton onClick={handleClick}>
            {disabled ? "EDIT" : "SAVE"}
          </CardButton>
          <CardTitle>{`${firstname} ${lastname}`}</CardTitle>
          <CardDate>{new Date(createdAt).toLocaleDateString()}</CardDate>
        </CardTop>
        <CardBottom>
          <CardBottomWrapper>
            <BottomTitle>Contact details</BottomTitle>
            <BottomField>
              <Label>firstname</Label>
              <Input
                disabled={disabled}
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleUpdate}
              />
              <StyledPermIdentityOutlined />
            </BottomField>
            <BottomField>
              <Label>Lastname</Label>
              <Input
                disabled={disabled}
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleUpdate}
              />
              <StyledPermIdentityOutlined />
            </BottomField>
            <BottomField>
              <Label>Email</Label>
              <Input
                disabled={disabled}
                type="email"
                name="email"
                value={email}
                onChange={handleUpdate}
              />
              <StyledMailOutline />
            </BottomField>
            <BottomField>
              <Label>Phone</Label>
              <Input
                disabled={disabled}
                type="tel"
                name="phone"
                value={phone}
                onChange={handleUpdate}
              />
              <StyledCallOutlined />
            </BottomField>
            <BottomField>
              <Label>Address</Label>
              <Input
                disabled={disabled}
                type="text"
                name="address"
                value={address}
                onChange={handleUpdate}
              />
              <StyledHomeOutlined />
            </BottomField>
            <BottomField>
              <Label>City</Label>
              <Input
                disabled={disabled}
                type="text"
                name="city"
                value={city}
                onChange={handleUpdate}
              />
              <StyledLocationCity />
            </BottomField>
            <BottomField>
              <Label>Country</Label>
              <Select
                disabled={disabled}
                name="country"
                value={country}
                onChange={handleUpdate}
              >
                {countries.map(({ country: cntry, code }) => (
                  <Option key={code} value={code}>
                    {cntry}
                  </Option>
                ))}
              </Select>
            </BottomField>
            <BottomField>
              <Label>Postal box</Label>
              <Input
                disabled={disabled}
                type="number"
                name="postalBox"
                value={postalBox}
                onChange={handleUpdate}
              />
              <StyledMarkunreadMailboxOutlined />
            </BottomField>
          </CardBottomWrapper>
        </CardBottom>
      </Card>
    </Container>
  )
}
