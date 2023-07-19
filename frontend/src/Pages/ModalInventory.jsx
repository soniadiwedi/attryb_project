import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
import AddInventoryForm from './AddInventoryForm'
export const ModalInventory = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} backgroundColor={"orange.200"}>Add Your Inventories</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Inventories</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <AddInventoryForm/>
            </ModalBody>
  
          </ModalContent>
        </Modal>
      </>
    )
}
