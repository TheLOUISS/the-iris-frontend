import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts, selectLowStock,
  updateProductQuantity
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Deletar Produto",
      message: "Tem certeza de que deseja excluir este produto.",
      buttons: [
        {
          label: "Deletar",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  const [sortBy, setSortBy] = useState("default");
  const [sortDirection, setSortDirection] = useState("ascending");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortAscending = () => {
    setSortDirection("ascending");
  };

  const handleSortDescending = () => {
    setSortDirection("descending");
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    let sortableProducts = [...filteredProducts];

    if (sortBy !== "default" && sortBy !== "") {
      sortableProducts.sort((a, b) => {
        if (sortDirection === "ascending") {
          if (sortBy === "name" || sortBy === "category") {
            return a[sortBy].localeCompare(b[sortBy]);
          } else if (sortBy === "value" || sortBy === "price" || sortBy === "quantity") {
            if (sortBy === "value") {
              return (a.price * a.quantity) - (b.price * b.quantity);
            } else {
              return a[sortBy] - b[sortBy];
            }
          }
        } else {
          if (sortBy === "name" || sortBy === "category") {
            return b[sortBy].localeCompare(a[sortBy]);
          } else if (sortBy === "value" || sortBy === "price" || sortBy === "quantity") {
            if (sortBy === "value") {
              return (b.price * b.quantity) - (a.price * a.quantity);
            } else {
              return b[sortBy] - a[sortBy];
            }
          }
        }
        return 0;
      });
    }

    setCurrentItems(sortableProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortableProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts, sortBy, sortDirection]);

  const handleDecreaseQuantity = async (productId, quantity) => {
    if (quantity > 0) {
      const updatedQuantity = parseInt(quantity) - 1;
      await dispatch(updateProductQuantity({ id: productId, quantity: updatedQuantity }));
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: updatedQuantity
      }));
    }
  };

  const handleIncreaseQuantity = async (productId, quantity) => {
    const updatedQuantity = parseInt(quantity) + 1;
    await dispatch(updateProductQuantity({ id: productId, quantity: updatedQuantity }));
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: updatedQuantity
    }));
  };

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    products.forEach(product => {
      initialQuantities[product._id] = product.quantity || 0;
    });
    setQuantities(initialQuantities);
  }, [products]);

  return (
      <div className="product-list">
        <hr />
        <div className="table">
          <div className="--flex-between --flex-dir-column">
            <div className="--flex-between --flex-dir-column">
            <span>
              <h3>Itens de inventário</h3>
            </span>
            </div>
            <span className="sorting-options">
            <button
                className="--btn --btn-ascendente"
                onClick={handleSortAscending}
            >
              Ascendente
            </button>
            <select
                className="--btn --btn-select"
                onChange={handleSortChange}
                value={sortBy}
            >
              <option value="default">Ordenar...</option>
              <option value="name">Nome</option>
              <option value="category">Categoria</option>
              <option value="price">Preço</option>
              <option value="quantity">Quantidade</option>
              <option value="value">Valor</option>
            </select>
            <button
                className="--btn --btn-descendente"
                onClick={handleSortDescending}
            >
              Descendente
            </button>
          </span>
            <span>
            <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          </div>

          {isLoading && <SpinnerImg />}

          <div className="table">
            {!isLoading && products.length === 0 ? (
                <p>-- Nenhum produto encontrado, adicione um produto...</p>
            ) : (
                <table>
                  <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Ação</th>
                  </tr>
                  </thead>

                  <tbody>
                  {currentItems.map((product, index) => {
                    const { _id, name, category, price, image } = product;
                    return (
                        <tr key={_id}>
                          <td>{index + 1}</td>
                          <td>
                            {image && (
                                <img
                                    src={image.filePath}
                                    alt={image.fileName}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "3px",
                                    }}
                                />
                            )}
                          </td>
                          <td>{shortenText(name, 16)}</td>
                          <td>{category}</td>
                          <td>{"R$"}{price}</td>
                          <td style={{ display: 'flex', alignItems: 'center' }}>
                            <AiOutlineMinus
                                onClick={() => handleDecreaseQuantity(_id, quantities[_id])}
                                disabled={quantities[_id] <= 0}
                                style={{
                                  marginRight: '8px',
                                  color: quantities[_id] <= 0 ? 'lightgray' : 'red',
                                  cursor: quantities[_id] <= 0 ? 'not-allowed' : 'pointer',
                                }}
                            />
                            {quantities[_id]}
                            <AiOutlinePlus
                                onClick={() => handleIncreaseQuantity(_id, quantities[_id])}
                                style={{
                                  marginLeft: '8px',
                                  color: 'green'
                                }}
                            />
                          </td>
                          <td>{"R$"}{(price * quantities[_id]).toFixed(2)}</td>
                          <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                            <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                            <span>
                          <FaTrashAlt
                              size={20}
                              color={"red"}
                              onClick={() => confirmDelete(_id)}
                          />
                        </span>
                          </td>
                        </tr>
                    );
                  })}
                  </tbody>
                </table>
            )}
          </div>
          <ReactPaginate
              breakLabel="..."
              nextLabel="Próximo"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="Anterior"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-prev"
              nextLinkClassName="page-next"
              activeLinkClassName="activePage"
          />
        </div>
      </div>
  );
};

export default ProductList;
