import { useSelector } from "react-redux";
import { ProfileProps } from "./profileFetch";

interface StateProps {
    profile: ProfileProps
    modal: boolean
}

export const giveProfile = () => useSelector((state: StateProps) => state.profile);
export const modalState = () => useSelector((state: StateProps) => state.modal);