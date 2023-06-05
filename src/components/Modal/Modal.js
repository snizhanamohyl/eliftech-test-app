import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";

export default function BasicUsage({ showRecaptcha, onChange }) {
  return (
    <>
      <Modal isOpen={showRecaptcha}>
        <ModalOverlay />
        <ModalContent w={"fit-content"}>
          <ModalHeader mx={"auto"}>Please enter a captcha</ModalHeader>
          <ModalBody mx={"auto"}>
            <ReCAPTCHA
              sitekey="6Ldh_2omAAAAAMmc_xeI43W7t1Q3eNHuv-jbt842"
              onChange={onChange}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
