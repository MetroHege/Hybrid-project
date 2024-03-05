// import {useEffect, useState} from 'react';
// import {MediaItemWithOwner} from '../types/DBTypes';
// import {useUserContext} from '../hooks/ContextHooks';
// import MediaRow from '../components/MediaRow';

// const Profiletest = () => {
//   const {user} = useUserContext();
//   const [mediaItems, setMediaItems] = useState<MediaItemWithOwner[]>([]);

//   useEffect(() => {
//     // Fetch media items here and set them to state
//     // For example:
//     const fetchMediaItems = async () => {
//       const response = await fetch('/api/media'); // Replace with your API endpoint
//       const data = await response.json();
//       setMediaItems(data);
//     };

//     fetchMediaItems();
//   }, []);

//   return (
//     <table>
//       {mediaItems
//         .filter((item) => item.user_id === user?.user_id) // Filter items based on user_id
//         .map((item) => (
//           <MediaRow key={item.media_id} item={item} />
//         ))}
//     </table>
//   );
// };

// export default Profiletest;

import MediaRow from '../components/MediaRow';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';

const Profiletest = () => {
  const {mediaArray} = useMedia();

  const {user} = useUserContext();

  return (
    <>
      <table className="w-full border-collapse">
        <thead className="text-xl text-white">
          <tr>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Created</th>
            {/* <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Type</th> */}
            <th className="px-4 py-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray
            .filter((item) => item.user_id === user?.user_id) // Filter items based on user_id
            .map((item) => (
              <MediaRow key={item.media_id} item={item} />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Profiletest;
