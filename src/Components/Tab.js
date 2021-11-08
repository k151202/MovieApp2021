import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  padding: 5px;
  margin: 0 2px 10px 2px;
  border: none;
  text-decoration: none;
  text-align: center;
  border-radius: 4px;
  background-color: #2ecc71;
  color: white;
  &:hover {
    background-color: #27ae60;
  }
`;

class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <Button className={className} onClick={onClick}>
        {label}
      </Button>
    );
  }
}

export default Tab;
