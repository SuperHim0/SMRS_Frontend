import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

const successNotification = (message : string) =>{
        notifications.show({
            title:'success',
            message:message,
            color:"green",
            autoClose: 3000,
            icon: <IconCheck />,
            withBorder:true,
            className:'border-green-500'
        })
}

const errorNotification = (message : String) =>{
    notifications.show({
            title:'Error',
            message:message,
            color:"red",
            autoClose: 3000,
            icon: <IconX />,
            withBorder:true,
            className:'border-green-500'
    })
}

export {successNotification ,errorNotification};