package main

import (
	controller "PT.ASTON-MARTIN/Controllers"
	connection "PT.ASTON-MARTIN/Models/Connection"

	"github.com/gin-gonic/gin"
)

func main() {

	port := ":1177"
	r := gin.Default()
	connection.ConnectDatabase()

	 r.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        if c.Request.Method == "OPTIONS" {
            return
        }
        c.Next()
    })



	//###BEGIN WEB API PT. HUSADA VINANCE TBK
	// Get data
	r.GET("/api/PT.PerstradaCaroseri/GetKeuangan", controller.GetPerstradaCaroseriControllersByID)

	//Insert data
	r.POST("/api/PT.PerstradaCaroseri/InsertKeuangan", controller.InsertPerstradaCaroseriControllers)

	// Update data
	r.PUT("/api/PT.PerstradaCaroseri/UpdateKeuangan", controller.UpdatePerstradaCaroseriControllers)

	//Delete data
	r.DELETE("/api/PT.PerstradaCaroseri/DeleteKeuangan", controller.DeletePerstradaCaroseriControllers)
	//###END WEB API PT.HUSADA VINANCE TBK


	r.Run(port)
}