import React from "react";
import { MdPendingActions } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { HiMiniXMark } from "react-icons/hi2";
import { RiRefundLine } from "react-icons/ri";
const ClientBookingRow = ({ item, index, openModal }) => {
  const { itemName, itemQuantity } = item;

  return (
    <tr>
      <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm">
        {(() => {
          const date = new Date(item?.date);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          const formattedTime = `${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${date
            .getSeconds()
            .toString()
            .padStart(2, "0")}`;
          return (
            <>
              <p className="text-gray-900 whitespace-no-wrap">
                {formattedDate}
              </p>
              <p className="text-gray-900 whitespace-no-wrap">
                {formattedTime}
              </p>
            </>
          );
        })()}
      </td>
      <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
        {itemName.map((item, index) => (
          <p
            key={index}
            className="text-gray-900 whitespace-no-wrap border-2 p-1"
          >{`${index + 1}.  ${item} - ${itemQuantity[index]}`}</p>
        ))}
      </td>
      <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap ">{item?.cartTotal}</p>
      </td>
      <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap ">
          {item?.transactionId}
        </p>
      </td>
      {/* <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>

                <p className='text-green-700 whitespace-no-wrap btn btn-outline'>{item?.status}</p>
            </td> */}

      <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
        <button
          className="btn-sm rounded-lg"
        >
          {item?.status === "pending" ? (
            <MdPendingActions size={20} />
          ) : item?.status === "confirmed" ? (
            <GrDeliver size={20} />
          ) : (
            <GiConfirmed size={20} color="green" />
          )}
        </button>
      </td>

      {item?.refundStatus === true &&
      Date.now() - item?.deliveryTime <= 604800000 ? (
        <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
          <button onClick={() => openModal(item)}>
            <RiRefundLine size={20} />
          </button>
        </td>
      ) : (
        <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
          <button>
            {" "}
            <HiMiniXMark color="red" />
          </button>
        </td>
      )}
    </tr>
  );
};

export default ClientBookingRow;
