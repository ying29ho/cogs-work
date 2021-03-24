import Button from "react-bootstrap/Button";
import "./button.scss";

const ThemeButton=({
    variant="primary",
    type,
    block,
    text,
    disabled,
    onClick,
})=>(
<Button type={type} onClick={onClick} variant={variant} block={block} disabled={disabled}>{text}</Button>
)

export default ThemeButton;