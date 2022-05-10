import {
  Button,
  Card,
  CheckBox,
  Divider,
  Icon,
  Input,
  Modal,
  Text,
  Tooltip,
  useTheme,
} from "@ui-kitten/components";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addCommunity,
  pushImagesToServer,
} from "../../Services/ServerCommunication";

import ImagePicker from "../ImagePickerComponent";
import React from "react";
import { defaultCommunityImage } from "../../assets/Images";
import tw from "twrnc";

export const CreateCommunityModal = (props) => {
  const theme = useTheme();

  //STATES
  const [communityName, setCommunityName] = React.useState("");
  const [communityDescription, setCommunityDescription] = React.useState("");
  const [communityPassword, setCommunityPassword] = React.useState(null);
  const [communityPrivate, setCommunityPrivate] = React.useState(false);
  const [image, setImage] = React.useState({ uri: "" });
  const [chooseImageVisible, setChooseImageVisible] = React.useState(false);

  const [missingInformation, setMissingInformation] = React.useState(false);
  const [missingFields, setMissingFields] = React.useState([]);
  const CrossIcon = () => (
    <Icon
      style={styles.crossStyle}
      fill={theme["color-basic-600"]}
      name="arrow-circle-left-outline"
    />
  );
  const AddIcon = () => (
    <Icon
      style={styles.addIconStyle}
      fill="#8F9BB3"
      name="plus-circle-outline"
    />
  );

  function addMissingField(field, name) {
    let object = false;
    if (name == "Bild" && field.uri == "") {
      object = true;
    }

    if (field == "" || !field || object) {
      if (!missingFields.includes(name)) {
        setMissingFields((missingFields) => [...missingFields, name]);
      }
    } else if (missingFields.includes(name)) {
      setMissingFields(missingFields.filter((field) => field != name));
    }
  }

  function setMissingFieldsFunc() {
    addMissingField(communityName, "Grannskapets namn");
    addMissingField(communityDescription, "Beskrivning");
    addMissingField(image, "Bild");
    if (communityPrivate) {
      addMissingField(communityPassword, "Lösenord");
    }
  }

  const PrintMissingInformation = () => {
    let row = missingFields.map((field) => field + ", ");
    for (let i = row.length - 1; i < row.length; i++) {
      row[i] = row[i].replace(/,/g, ""); //tar bort sista kommatecknet
    }
    return row;
  };

  const CloseCreateCommunityIcon = () => {
    return (
      <TouchableOpacity onPress={() => props.setVisible(false)}>
        <CrossIcon />
      </TouchableOpacity>
    );
  };

  const ChooseImageIcon = () => (
    <>
      <Image
        style={[
          tw`rounded-full mt-2`,
          {
            borderColor: "red",
            borderWidth: missingFields.includes("Bild") ? 1 : 0,
          },
        ]}
        source={{
          uri: image.uri ? image.uri : defaultCommunityImage,
          height: 80,
          width: 80,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setChooseImageVisible(true);
        }}
        style={styles.AddIconContainer}
      >
        <AddIcon />
      </TouchableOpacity>
    </>
  );
  const CreateCommunityButton = () => (
    <Button
      style={tw`mt-2`}
      onPress={async () => {
        await createCommunity();
      }}
    >
      Skapa grannskap
    </Button>
  );

  const ChoseImageModal = () => {
    return (
      <Modal
        visible={chooseImageVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setChooseImageVisible(false);
        }}
      >
        <Card disabled={true}>
          <ImagePicker
            context="CommunityImage"
            updateResult={(result) => {
              setImage(result);
            }}
            hideTakePicture={() => {
              setChooseImageVisible(false);
            }}
          />
          <Button
            style={tw`mt-2 w-50`}
            onPress={() => setChooseImageVisible(false)}
          >
            Klar
          </Button>
        </Card>
      </Modal>
    );
  };
  function quitCreateCommunity() {
    props.setVisible(false);
    setMissingFields([]);
    setCommunityName("");
    setCommunityDescription("");
    setCommunityPrivate(false);
    setImage({ uri: "" });
    setCommunityPassword(null);
  }

  const onCheckedChange = (isChecked) => {
    setCommunityPrivate(isChecked);
    if (missingFields.includes("Lösenord")) {
      setMissingFields(missingFields.filter((field) => field != "Lösenord"));
    }
  };

  async function createCommunity() {
    setMissingInformation(false);
    if (communityName == "" || communityDescription == "" || image == "") {
      setMissingFieldsFunc();
      setMissingInformation(true);
    } else {
      const newImgUrl = await pushImagesToServer(
        image,
        "communityimages",
        null
      );
      let communityData = {
        name: communityName,
        location: null,
        description: communityDescription,
        imgurl: newImgUrl,
        private: communityPrivate,
        password: communityPassword,
      };
      await addCommunity(communityData);
      props.getComm();
      quitCreateCommunity();
    }
  }
  return (
    <Modal
      visible={props.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onBackdropPress={quitCreateCommunity}
    >
      <Card disabled={true}>
        <ChoseImageModal />
        <View style={{ height: 393, width: 260 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 40 }}>
              <CloseCreateCommunityIcon />
            </View>
            <Text style={tw`text-lg font-semibold`}>Skapa nytt grannskap</Text>
          </View>
          <Divider />
          <ScrollView style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <ChooseImageIcon />
            </View>
            <Input
              status={
                missingFields.includes("Grannskapets namn") ? "danger" : ""
              }
              style={{ marginTop: 10 }}
              label="Grannskapets namn"
              value={communityName}
              returnKeyType="done"
              onChangeText={(nextValue) => setCommunityName(nextValue)}
            />
            <Input
              status={missingFields.includes("Beskrivning") ? "danger" : ""}
              style={{ marginTop: 10 }}
              label="Beskrivning"
              textAlignVertical={"top"}
              blurOnSubmit={true}
              multiline={true}
              returnKeyType="done"
              textStyle={{ minHeight: 64 }}
              value={communityDescription}
              onChangeText={(nextValue) => setCommunityDescription(nextValue)}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                style={{ marginRight: 10 }}
                checked={communityPrivate}
                onChange={onCheckedChange}
              />
              <Text>Privat grannskap</Text>
            </View>
            {communityPrivate && (
              <Input
                status={missingFields.includes("Lösenord") ? "danger" : ""}
                style={{ marginTop: 10 }}
                label="Lösenord"
                returnKeyType="done"
                value={communityPassword}
                onChangeText={(nextValue) => setCommunityPassword(nextValue)}
              />
            )}
            <View style={{ paddingTop: 10 }}>
              <Tooltip
                anchor={CreateCommunityButton}
                visible={missingInformation}
                onBackdropPress={() => setMissingInformation(false)}
              >
                {""}
                Fält som måste fyllas i: <PrintMissingInformation />
              </Tooltip>
            </View>
          </ScrollView>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addIconStyle: {
    width: 40,
    height: 40,
  },
  AddIconContainer: {
    position: "absolute",
    marginTop: 50,
    marginLeft: 50,
    backgroundColor: "white",
    borderRadius: 50,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  cameraStyle: {
    width: 60,
    height: 60,
  },
  crossStyle: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
});

export default CreateCommunityModal;
