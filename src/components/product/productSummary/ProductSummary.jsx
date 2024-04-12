import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX, BsCartDash } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_LOWSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectLowStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
const lowStockIcon = <BsCartDash size={40} color="#fff" />;

export const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const lowStock = useSelector(selectLowStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_LOWSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
      <div className="product-summary">
        <h3 className="--mt">Estatísticas de Inventário</h3>
        <div className="info-summary">
          <InfoBox
              icon={productIcon}
              title={"Total de Produtos"}
              count={products.length}
              bgColor="card1"
          />
          <InfoBox
              icon={earningIcon}
              title={"Valor Total"}
              count={formatPrice(totalStoreValue)}
              bgColor="card2"
          />
          <InfoBox
              icon={outOfStockIcon}
              title={"Sem Estoque"}
              count={outOfStock}
              bgColor="card3"
          />
          <InfoBox
              icon={lowStockIcon}
              title={"Baixo Estoque"}
              count={lowStock}
              bgColor="card5"
          />
          <InfoBox
              icon={categoryIcon}
              title={"Categorias"}
              count={category.length}
              bgColor="card4"
          />
        </div>
      </div>
  );
};

export default ProductSummary;
