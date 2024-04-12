import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import React from 'react'
  import { useDisclosure } from '@chakra-ui/react'
  import { Button } from '@chakra-ui/react'
  
  const GameModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Play a Game</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody>
          <iframe frameborder="0" src="https://itch.io/embed/2638442" width="300" height="200"><a href="https://chris766x.itch.io/puchu">puchu by Chris766X</a></iframe>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
  }
  
  export default GameModal