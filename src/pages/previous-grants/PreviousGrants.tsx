import React from "react";
import useStore from "../../hooks/state/useStore";
import createUserSlice from "../../state/slices/UserSlice";
import { UserSliceState } from "../../state/types";


const PreviousGrants = () => {

  const { currentChatSession } = useStore<UserSliceState>((state) => state);



  return (
    <div>
      <h2>Previous Grants</h2>
      {currentChatSession ? (
        <div>
          <h3>{currentChatSession.title}</h3>
        </div>
      ) : (
        <p>No chat session</p>
      )}


    </div>
  );
};

export default PreviousGrants;
