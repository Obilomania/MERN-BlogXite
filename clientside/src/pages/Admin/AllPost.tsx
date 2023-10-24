import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Loading from "../../components/Loading";
import { selectIsLoggedIn } from "../../redux/features/auth/userAuthSlice";
import { deleteAPost, getPosts } from "../../redux/features/post/postSlice";
import toastNotify from "../../Helpers/toastNotify";
import Search from "./Search";
import {
  FILTER_POSTS,
  selectFilteredPost,
} from "../../redux/features/post/filterSlice";
import ReactPaginate from "react-paginate";



const AllPost = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.post
  );
  const [search, setSearch] = useState("");
  const filteredPost = useSelector(selectFilteredPost);

  //FUNCTION FOR DELETING A POST
  const handleMenuItemDelete = async (id: any) => {
    await dispatch(deleteAPost(id));
    await dispatch(getPosts());
  };


  //Beginning of Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredPost.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPost.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPost]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPost.length;

    setItemOffset(newOffset);
  };
  //End of Pagination

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getPosts());
    }
    if (isError) {
      toastNotify(message, "error");
    }
  }, [isLoggedIn, dispatch, isError, message]);

  useEffect(() => {
    dispatch(FILTER_POSTS({ posts, search }));
  }, [posts, search, dispatch]);

  return (
    <Post>
      {isLoading && <Loading />}
      <h1 className="heading text-center text-2xl font-semibold text-primary">
        All Post
      </h1>
      <div className="topSearch ">
        <div className="postAmount">
          <p className="text-dark font-semibold">
            ({filteredPost?.length}){" "}
            <span className="text-primary font-bold">Posts</span>
          </p>
        </div>
        <div className="search">
          <Search
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="allPost">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Post image
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Post Title
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Comments
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && posts.length > 0 ? (
                currentItems.map((post: any, index: number) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 flex justify-center items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={post?.image.filePath}
                          alt=""
                          className="w-[4rem] h-[3rem] rounded-2xl"
                        />
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {post?.title.substring(0, 20).concat("...")}
                      </th>
                      <td className="px-6 py-2 text-center">{post.category}</td>
                      <td className="px-6 py-2 text-center">
                        {post?.comments.length}
                      </td>
                      <td className="px-6 py-2 text-center">{post?.created}</td>
                      <td className="px-6 py-2 text-center flex items-center justify-center gap-4 CAL">
                        <Link
                          to={`/post/${post?.id}`}
                          className="font-medium text-center bg-green-600 text-white p-2 rounded dark:text-blue-500 hover:underline"
                        >
                          <AiOutlineEye />
                        </Link>
                        <Link
                          to={`/editpost/${post?.id}`}
                          className="font-medium text-center bg-blue-600 text-white p-2 rounded dark:text-white-500 hover:underline"
                        >
                          <AiOutlineEdit />
                        </Link>
                        <span
                          onClick={() => handleMenuItemDelete(post?.id)}
                          className="font-medium cursor-pointer text-center bg-red-600 text-white p-2 rounded dark:text-blue-500 hover:underline"
                        >
                          <BsTrash />
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center text-2xl font-semibold w-full text-primary">
                  <th>No Post Available</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </Post>
  );
};

const Post = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .allPost {
    width: 100%;
    min-height: 70vh;
  }
  .allPost table {
    width: 100%;
  }
  .CAL {
  }
  .topSearch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 3rem;
    border-bottom: 1px solid lightgrey;
  }
  .active {
    background-color: rgb(31, 147, 255);
    color: white;
  }

  .pagination {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    font-size: 1rem;
  }

  .pagination .page-num {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    font-weight: normal;
    color: #333;
    border: 1px solid #333;
    margin: 2px;
  }

  .pagination .page-num:hover {
    color: #1565d8;
    background-color: var(--light-blue);
  }
  .pagination .active {
    color: white;
    background-color: #1565d8;
  }
`;
export default AllPost;
