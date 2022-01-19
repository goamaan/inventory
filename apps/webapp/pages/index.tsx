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
  useToast,
} from '@chakra-ui/react';
import {
  Item,
  Shipment,
  useAddItemToShipmentMutation,
  useCreateItemMutation,
  useCreateShipmentMutation,
  useDeleteItemMutation,
  useDeleteShipmentMutation,
  useItemsQuery,
  useRemoveItemFromShipmentMutation,
  useShipmentsQuery,
  useUpdateItemMutation,
  useUpdateShipmentMutation,
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

  const [updateItemText, setUpdateItemText] = useState('');
  const [updateItemDesc, setUpdateItemDesc] = useState('');
  const [updateItemCost, setUpdateItemCost] = useState(0);

  const [addShipmentText, setAddShipmentText] = useState('');

  const [updateShipmentText, setUpdateShipmentText] = useState('');

  const [shipmentChosen, setShipmentChose] = useState('');

  const [openItem, setOpenItem] = useState<Item>();
  const [openShipment, setOpenShipment] = useState<Shipment>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [createShipment] = useCreateShipmentMutation();
  const [updateShipment] = useUpdateShipmentMutation();
  const [deleteShipment] = useDeleteShipmentMutation();
  const [addToShipment] = useAddItemToShipmentMutation();
  const [removeFromShipment] = useRemoveItemFromShipmentMutation();

  const toast = useToast();

  useEffect(() => {
    if (!loading) {
      if (data) {
        setCategorized(data.items.filter((item) => !item.shipment));
      }
    }
  }, [data, loading]);

  const onCreateItem = async () => {
    try {
      await createItem({
        variables: {
          data: {
            cost: addItemCost,
            description: addItemDesc,
            title: addItemText,
          },
        },
        refetchQueries: 'active',
      });
      onClose();
      setOpenItem(null);
      toast({
        title: 'Created item',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error creating item',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onUpdateItem = async () => {
    try {
      await updateItem({
        variables: {
          id: openItem.id,
          data: {
            cost: updateItemCost,
            description: updateItemDesc,
            title: updateItemText,
          },
        },
        refetchQueries: 'active',
      });
      onClose();
      setOpenItem(null);
      toast({
        title: 'Updated item',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error updating item',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onDeleteItem = async (item: Item) => {
    try {
      await deleteItem({
        variables: {
          id: item.id,
        },
        refetchQueries: 'active',
      });
      onClose();
      toast({
        title: 'Deleted item',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error deleting item',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onCreateShipment = async () => {
    try {
      await createShipment({
        variables: {
          data: {
            title: addShipmentText,
          },
        },
        refetchQueries: 'active',
      });
      onClose();
      toast({
        title: 'Created shipment',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error creating shipment',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onUpdateShipment = async () => {
    try {
      await updateShipment({
        variables: {
          id: openShipment.id,
          data: {
            title: updateShipmentText,
          },
        },
        refetchQueries: 'active',
      });
      onClose();
      setUpdateShipmentText('');
      toast({
        title: 'Updated shipment',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error updating shipment',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onDeleteShipment = async (shipment: Shipment) => {
    try {
      await deleteShipment({
        variables: {
          id: shipment.id,
        },
        refetchQueries: 'active',
      });
      onClose();
      toast({
        title: 'Deleted shipment',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error deleting shipment',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onAddToShip = async (itemId: string, shipmentId: string) => {
    try {
      await addToShipment({
        variables: {
          itemId,
          shipmentId,
        },
        refetchQueries: 'active',
      });
      onClose();
      toast({
        title: 'Added item to shipment',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Removed from shipment',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onRemovefromShip = async (itemId: string, shipmentId: string) => {
    try {
      await removeFromShipment({
        variables: {
          itemId,
          shipmentId,
        },
        refetchQueries: 'active',
      });
      onClose();
      toast({
        title: 'Deleted shipment',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error deleting shipment',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

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
        <Button color="brand.500" width="full" mr={3} onClick={onCreateItem}>
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
            setUpdateItemText(e.target.value);
          }}
          value={updateItemText}
        />
        <Textarea
          placeholder="Description..."
          value={updateItemDesc}
          onChange={(e) => {
            setUpdateItemDesc(e.target.value);
          }}
        />
        <NumberInput
          min={0}
          max={99999999}
          onChange={(e) => {
            setUpdateItemCost(parseFloat(e));
          }}
          value={updateItemCost}
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
        <Button color="brand.500" width="full" mr={3} onClick={onUpdateItem}>
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
            setAddShipmentText(e.target.value);
          }}
          value={addShipmentText}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="brand.500"
          width="full"
          mr={3}
          onClick={onCreateShipment}
        >
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
            setUpdateShipmentText(e.target.value);
          }}
          value={updateShipmentText}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="brand.500"
          width="full"
          mr={3}
          onClick={onUpdateShipment}
        >
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
        <Select
          value={shipmentChosen}
          placeholder="Choose shipment"
          onChange={(e) => setShipmentChose(e.target.value)}
        >
          {shipments.shipments.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </Select>
      </ModalBody>
      <ModalFooter>
        <Button
          color="brand.500"
          width="full"
          mr={3}
          onClick={() => onAddToShip(openItem.id, shipmentChosen)}
        >
          Add
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );

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
        <Text fontSize={'3xl'}>Uncategorized Items:</Text>
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
                  aria-label="Edit Item"
                  icon={<EditIcon />}
                  colorScheme={'teal'}
                  size={'md'}
                  onClick={() => {
                    setModalType('updateItem');
                    setUpdateItemCost(item.cost);
                    setUpdateItemDesc(item.description);
                    setUpdateItemText(item.title);
                    setOpenItem(item);
                    onOpen();
                  }}
                />
                <IconButton
                  aria-label="Delete Item"
                  ml={5}
                  icon={<DeleteIcon />}
                  colorScheme={'red'}
                  size={'md'}
                  onClick={async () => {
                    await onDeleteItem(item);
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
                    setOpenItem(item);
                    setModalType('shipment');
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
        <Text fontSize={'3xl'}>In Shipment:</Text>
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
                <IconButton
                  aria-label="Edit Shipment"
                  icon={<EditIcon />}
                  size={'md'}
                  onClick={() => {
                    setModalType('updateShipment');
                    setUpdateShipmentText(shipment.title);
                    setOpenShipment(shipment);
                    onOpen();
                  }}
                />
                <IconButton
                  aria-label="Remove Shipment"
                  icon={<DeleteIcon />}
                  ml={5}
                  colorScheme={'red'}
                  size={'sm'}
                  onClick={() => onDeleteShipment(shipment)}
                />
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
                      onClick={() => onRemovefromShip(item.id, shipment.id)}
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
