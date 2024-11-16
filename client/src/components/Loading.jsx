/* eslint-disable react/prop-types */
const Loading = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600 border-opacity-80"></div>
      <span className="ml-4 text-gray-600 text-sm">{message}</span>
    </div>
  );
};

export default Loading;
