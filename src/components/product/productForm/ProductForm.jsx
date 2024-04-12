import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
                       product,
                       productImage,
                       imagePreview,
                       description,
                       setDescription,
                       handleInputChange,
                       handleImageChange,
                       saveProduct,
                     }) => {
  return (
      <div className="add-product">
        <Card cardClass={"card"}>
          <form onSubmit={saveProduct}>
            <div className="circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
            <Card cardClass={"group"}>
              <label>Imagem do Produto</label>
              <code className="--color-dark">
                Formatos suportados: jpg, jpeg, png
              </code>
              <input
                  type="file"
                  name="image"
                  className="input"
                  onChange={(e) => handleImageChange(e)}
              />

              {imagePreview != null ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Produto" />
                  </div>
              ) : (
                  <p>Nenhuma imagem escolhida para este produto.</p>
              )}
            </Card>
            <label className="first-label">Nome do Produto:</label>
            <input
                type="text"
                placeholder="Nome do Produto"
                name="name"
                className="input"
                value={product?.name}
                onChange={handleInputChange}
            />

            <label>Categoria do Produto:</label>
            <input
                type="text"
                placeholder="Categoria do Produto"
                name="category"
                className="input"
                value={product?.category}
                onChange={handleInputChange}
            />

            <label>Preço do Produto:</label>
            <input
                type="text"
                placeholder="Exemplo: 1600.89"
                name="price"
                className="input"
                value={product?.price}
                onChange={handleInputChange}
            />

            <label>Quantidade do Produto:</label>
            <input
                type="number"
                placeholder="Quantidade do Produto"
                name="quantity"
                className="input"
                value={product?.quantity}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue) && parseInt(inputValue) >= 0) {
                    handleInputChange(e);
                  }
                }}
            />

            <label>Descrição do Produto:</label>
            <ReactQuill
                theme="snow"
                className="input"
                value={description}
                onChange={setDescription}
                modules={ProductForm.modules}
                formats={ProductForm.formats}
            />

            <div className="--my">
              <button type="submit" className="--btn --btn-product-form">
                Salvar Produto
              </button>
            </div>
          </form>
        </Card>
      </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
