import React, { useState } from "react"
import { mobile, tablet } from "responsive"
import styled from "styled-components"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

const ModalContainer = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  background-color: #00000047;
  padding-top: 10%;
  display: flex;
  justify-content: center;
  ${mobile({ paddingTop: "20%" })}
`
const Main = styled.div`
  max-width: 700px;
  width: 90vw;
  height: 50vh;
  max-height: 225px;
  background-color: #ffffff;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 40px;
  ${tablet({ width: "calc(90vw - 40px)", padding: 20 })};
  display: flex;
  flex-direction: column;
`
const ModalTitle = styled.h2`
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  flex-grow: 33px;
  ${mobile({ fontSize: 16 })}
`
const ModalContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Children = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ModalButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "column" })};
`
const ModalButton = styled.button`
  margin: 0 10px;
  padding: 16px 58px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: transparent;
  transition: all 500ms ease 50ms;
  cursor: pointer;
  &:hover {
    background-color: #222222;
    color: white;
  }
  ${mobile({ padding: "8px 29px", margin: "10px 0" })};
`
const Modal = ({ onClose, onCopy, children, title, copy, canCopy }) => {
  const { t } = useTranslation()
  return (
    <ModalContainer>
      <Main>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>
          <Children>{children}</Children>
          <ModalButtonContainer>
            <ModalButton onClick={onClose}>
              {t("cart.modal.cancel")}
            </ModalButton>
            {canCopy && (
              <ModalButton onClick={onCopy}>
                {copy ? t("cart.modal.copied") : t("cart.modal.copy")}
              </ModalButton>
            )}
          </ModalButtonContainer>
        </ModalContent>
      </Main>
    </ModalContainer>
  )
}
export default Modal

Modal.propTypes = {
  canCopy: PropTypes.bool,
  children: PropTypes.node,
  copy: PropTypes.bool,
  onClose: PropTypes.func,
  onCopy: PropTypes.func,
  title: PropTypes.string
}
Modal.defaultProps = {
  canCopy: false,
  children: null,
  copy: false,
  onClose: () => {},
  onCopy: () => {},
  title: ""
}
