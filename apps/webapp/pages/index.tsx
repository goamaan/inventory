import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Item,
  Shipment,
  useItemsQuery,
  useShipmentsQuery,
} from '@inventory/data-access';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const { data, loading } = useItemsQuery();
  const { data: shipments, loading: shipmentLoading } = useShipmentsQuery();
  const [uncategorized, setCategorized] = useState<Item[]>([]);
  const [modalType, setModalType] = useState<
    'addItem' | 'updateItem' | 'addShipment' | 'updateShipment' | 'shipment'
  >();
  const [addItemText, setAddItemText] = useState('');
  const [addItemDesc, setAddItemDesc] = useState('');
  const [addItemCost, setAddItemCost] = useState(0);
  const [openItem, setOpenItem] = useState<Item>();
  const [openShipment, setOpenShipment] = useState<Shipment>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addItemModal = (
    <>
      <ModalHeader>Create Item</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Input
          placeholder="Title..."
          onChange={(e) => {
            setAddItemText(e.target.value);
          }}
          value={addItemText}
        />
        <Textarea
          placeholder="Description..."
          value={addItemDesc}
          onChange={(e) => {
            setAddItemDesc(e.target.value);
          }}
        />
        <NumberInput
          min={0}
          max={99999999}
          onChange={(e) => {
            setAddItemCost(parseFloat(e));
          }}
          value={addItemCost}
          precision={2}
          step={0.01}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </ModalBody>
      <ModalFooter>
        <Button color="brand.500" width="full" mr={3} type="submit">
          Create
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );

  const updateItemModal = openItem && (
    <>
      <ModalHeader>update Item</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Input
          placeholder="Title..."
          onChange={(e) => {
            setAddItemText(e.target.value);
          }}
          value={openItem.title}
        />
        <Textarea
          placeholder="Description..."
          value={openItem.description}
          onChange={(e) => {
            setAddItemDesc(e.target.value);
          }}
        />
        <NumberInput
          min={0}
          max={99999999}
          onChange={(e) => {
            setAddItemCost(parseFloat(e));
          }}
          value={openItem.cost.toString()}
          precision={2}
          step={0.01}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </ModalBody>
      <ModalFooter>
        <Button color="brand.500" width="full" mr={3} type="submit">
          Update
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );

  const addShipmentModal = (
    <>
      <ModalHeader>Create Shipment</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Input
          placeholder="Title..."
          onChange={(e) => {
            setAddItemText(e.target.value);
          }}
          value={addItemText}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="brand.500" width="full" mr={3} type="submit">
          Create
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );

  const updateShipmentModal = openShipment && (
    <>
      <ModalHeader>Update Shipment</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Input
          placeholder="Title..."
          onChange={(e) => {
            setAddItemText(e.target.value);
          }}
          value={openShipment.title}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="brand.500" width="full" mr={3} type="submit">
          Update
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );

  const addToShipmentModal = shipments && (
    <>
      <ModalHeader>Add to Shipment</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Select placeholder="Choose shipment">
          {shipments.shipments.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </Select>
      </ModalBody>
      <ModalFooter>
        <Button color="brand.500" width="full" mr={3} type="submit">
          Add
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );

  useEffect(() => {
    if (!loading) {
      if (data) {
        setCategorized(data.items.filter((item) => !item.shipment));
      }
    }
  }, [data, loading]);

  if (loading || shipmentLoading) {
    return (
      <Box>
        <NextSeo title="All inventory" description="All inventory" />
        <Flex justify="center" align="center">
          <Spinner size="lg" mt="20vh" />
        </Flex>
      </Box>
    );
  }

  return (
    <Flex w="full" direction={'column'}>
      <NextSeo title="All inventory" description="All inventory" />
      <Flex
        align={'center'}
        justify={'space-between'}
        direction={'column'}
        mt="10vh"
      >
        <Text fontSize={'3xl'}>Uncategorized Items</Text>
        <Button
          mt={3}
          onClick={() => {
            setModalType('addItem');
            onOpen();
          }}
          colorScheme={'green'}
        >
          Add item
        </Button>
        <Flex maxW={'full'}>
          {uncategorized.map((item) => (
            <Box w="20vw" maxW="30vw" h="10vh" maxH="20vh" key={item.id} m={6}>
              <Box
                layerStyle="card"
                boxShadow={'2xl'}
                rounded={'lg'}
                p="3em"
                textAlign={'center'}
              >
                <IconButton
                  aria-label="Remove Item"
                  icon={<EditIcon />}
                  size={'md'}
                  onClick={() => {
                    setModalType('updateItem');
                    setOpenItem(item);
                    onOpen();
                  }}
                />
                <Text fontSize={'2xl'}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{`$${item.cost}`}</Text>
                <Button
                  size={'sm'}
                  colorScheme={'blue'}
                  p={3}
                  mt={4}
                  onClick={() => {
                    setModalType('shipment');
                    setOpenItem(item);
                    onOpen();
                  }}
                >
                  Add to shipment
                </Button>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        justify={'space-between'}
        direction={'column'}
        mt="10vh"
      >
        <Text fontSize={'3xl'}>In Shipment</Text>
        <Button
          mt={3}
          onClick={() => {
            setModalType('addShipment');
            onOpen();
          }}
          colorScheme={'green'}
        >
          Create Shipment
        </Button>
        <Flex maxW={'full'}>
          {shipments.shipments.map((shipment) => (
            <Box
              w="20vw"
              maxW="30vw"
              h="10vh"
              maxH="20vh"
              key={shipment.id}
              m={6}
            >
              <Box
                layerStyle="card"
                boxShadow={'2xl'}
                rounded={'lg'}
                p="3em"
                textAlign={'center'}
              >
                <Text fontSize={'2xl'}>{shipment.title}</Text>
                {shipment.items.map((item) => (
                  <Flex key={item.id} m={3} align={'center'} justify={'center'}>
                    <Text mr={3} fontSize={'xl'}>
                      {item.title}
                    </Text>
                    <IconButton
                      aria-label="Remove Item"
                      icon={<DeleteIcon />}
                      colorScheme={'red'}
                      size={'xs'}
                    />
                  </Flex>
                ))}
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          {modalType === 'addItem'
            ? addItemModal
            : modalType === 'addShipment'
            ? addShipmentModal
            : modalType === 'updateItem'
            ? updateItemModal
            : modalType === 'updateShipment'
            ? updateShipmentModal
            : addToShipmentModal}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Index;
