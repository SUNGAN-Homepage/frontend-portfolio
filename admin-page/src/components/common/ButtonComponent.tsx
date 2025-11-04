import React, { ReactNode } from "react";
import {
  Button,
  SxProps,
  Theme,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

// ButtonComponentProps 인터페이스 정의
interface ButtonComponentProps extends MuiButtonProps {
  children: ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  onClick,
  sx,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      sx={{ ...sx, background: "black", color: "white" }} // sx 적용
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
