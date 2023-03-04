import { Box, Center, Heading, Image, Text } from "@chakra-ui/react"
import React from "react"
import pic1 from "../../assets/home_pic1.jpg"

function AboutDisplay(props) {
  return (
    <>
      <Box mt={-5}>
        <div
          style={{
            position: "absolute",
            overflow: "hidden",
            left: 0,
            width: "100%",
            lineHeight: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{ position: "relative", display: "block" }}
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,160L34.3,154.7C68.6,149,137,139,206,117.3C274.3,96,343,64,411,53.3C480,43,549,53,617,85.3C685.7,117,754,171,823,176C891.4,181,960,139,1029,112C1097.1,85,1166,75,1234,90.7C1302.9,107,1371,149,1406,170.7L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div
          style={{ position: "relative", margin: "10px", marginTop: "30px" }}
        >
          <Heading mb={5}>ABOUT US</Heading>
          <Text>
            Welcome to our ecommerce fashion website! Our website is created for
            educational purposes with the intent of creating a project for demo
            purposes. We aim to provide a comprehensive ecommerce platform for
            fashion enthusiasts to browse and shop for the latest fashion trends
            and styles. Our team is dedicated to creating a seamless and
            enjoyable shopping experience for our customers. We understand that
            shopping for fashion online can be overwhelming, which is why we
            strive to curate a collection of quality products from reputable
            brands to make your shopping experience stress-free. We believe that
            fashion is an expression of individuality and personal style, and
            our mission is to help you find the perfect pieces to express your
            unique style. Whether you're looking for casual wear, formal wear,
            or accessories, we have something for everyone. We are committed to
            providing exceptional customer service and support to ensure that
            your shopping experience with us is a positive one. If you have any
            questions or concerns, our customer service team is available to
            assist you. Thank you for choosing our ecommerce fashion website. We
            hope that you enjoy shopping with us and that you find everything
            you're looking for. Happy shopping!
          </Text>
          <Center mt={10}>
            <Image
              style={{
                borderRadius: "10px",
              }}
              maxWidth="15rem"
              width="100%"
              src={pic1}
            />
            <Text maxWidth="40vw" margin={5} fontSize="1.15em">
              Hi there! My name is Arindam, and I am a new programmer trying my
              hands on with live projects. I have a passion for coding and love
              to create useful and intuitive applications that make people's
              lives easier. With an experience of 1.5 years, I have worked
              primarily in JavaScript and React. I have always been fascinated
              by the power of technology and how it can be used to solve complex
              problems. After completing my studies in computer science, I
              decided to pursue a career in programming. I am now excited to
              apply my knowledge and skills to real-world projects and to
              continue learning and growing as a developer. My experience in
              JavaScript and React has given me a solid foundation in front-end
              development, and I am confident in my ability to build responsive
              and user-friendly applications. I enjoy working on challenging
              projects that require creative problem-solving and attention to
              detail. Thank you for taking the time to learn a little bit about
              me. I look forward to working on exciting projects and
              contributing to the programming community.
            </Text>
          </Center>
        </div>
      </Box>
    </>
  )
}

export default AboutDisplay
