package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	models "PT.ASTON-MARTIN/Models"
	DataPerusahaan "PT.ASTON-MARTIN/Models/DataPerusahaan"
	KeuanganRepository "PT.ASTON-MARTIN/repository"
)

// InsertJurusanController adalah handler untuk menyisipkan data keuangan baru.
func GetPerstradaCaroseriControllersByID(c *gin.Context) {
	var request DataPerusahaan.Keuangan
	var response models.BaseResponseModels

	response = KeuanganRepository.GetPerstradaCaroseriByID(request)
	if response.CodeResponse != 200 {
		c.JSON(response.CodeResponse, response)
		return
	}

	c.JSON(http.StatusOK, response)
}

func InsertPerstradaCaroseriControllers(c *gin.Context) {
	var request DataPerusahaan.Keuangan
	var response models.BaseResponseModels

	if err := c.ShouldBindJSON(&request); err != nil {
		response = models.BaseResponseModels{
			CodeResponse:  400,
			HeaderMessage: "Bad Request",
			Message:       err.Error(),
			Data:          nil,
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response = KeuanganRepository.InsertPerstradaCaroseri(request)
	if response.CodeResponse != 200 {
		c.JSON(response.CodeResponse, response)
		return
	}

	c.JSON(http.StatusOK, response)
}

func UpdatePerstradaCaroseriControllers(c *gin.Context) {
	var request DataPerusahaan.Keuangan
	var response models.BaseResponseModels

	if err := c.ShouldBindJSON(&request); err != nil {
		response = models.BaseResponseModels{
			CodeResponse:  400,
			HeaderMessage: "Bad Request",
			Message:       err.Error(),
			Data:          nil,
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response = KeuanganRepository.UpdatePerstradaCaroseri(request)
	if response.CodeResponse != 200 {
		c.JSON(response.CodeResponse, response)
		return
	}

	c.JSON(http.StatusOK, response)
}

func DeletePerstradaCaroseriControllers(c *gin.Context) {
	var request DataPerusahaan.Keuangan
	var response models.BaseResponseModels

	if err := c.ShouldBindJSON(&request); err != nil {
		response = models.BaseResponseModels{
			CodeResponse:  400,
			HeaderMessage: "Bad Request",
			Message:       err.Error(),
			Data:          nil,
		}
		c.JSON(http.StatusBadRequest, response)
		return
	}

	response = KeuanganRepository.DeletePerstradaCaroseri(request)
	if response.CodeResponse != 200 {
		c.JSON(response.CodeResponse, response)
		return
	}

	c.JSON(http.StatusOK, response)
}