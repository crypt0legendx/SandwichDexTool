import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

function ClickTooltip({onClick,children}) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    onClick();
  };

  return (
    <>
        <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
            <Tooltip
            PopperProps={{
                disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            title={'copied'}
            >
            <button className="wallet-item-action" onClick={handleTooltipOpen}>{children}</button>
            </Tooltip>
        </div>
        </ClickAwayListener>        
    </>
  );
}

export default ClickTooltip;