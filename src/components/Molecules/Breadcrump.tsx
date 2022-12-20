import React from 'react';

import Heading from '../Atoms/Heading';
import Icon from '../Atoms/Icon';
import { useNavigate } from 'react-router-dom';

interface Iprops {
  title: string;
  navigation: any;
}

export default function Breadcrump({ title, navigation }: Iprops) {
  const navigate = useNavigate();
  const handleClick = (item: any) => {
    console.log('item', item)
    navigate(`/dashboard/${item.clickTo}`);
  };

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Heading fontWeight="bold" fontSize="xl">
          {title}
        </Heading>
        <div className="text-right">
          {/* <button className="rounded-circle btn py-2 btn-print bg-light-gray">
            <Icon name="print" size={19} />
          </button> */}
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Icon name="home" />
        {navigation.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <Icon name="arrow-right" />
            {
              typeof (item) === 'string' ? (
                <div>
                  <span className="text-xs" >{item}</span>
                </div>
              ) : (
                <div onClick={() => { handleClick(item) }} style={{ cursor: 'pointer' }}>
                  <span className="text-xs" >{item?.name}</span>
                </div>
              )
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
