import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafiosService } from './desafios.service';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) {}
    private readonly looger = new Logger(DesafiosController.name);
    
    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
            this.looger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`);
            return await this.desafiosService.criarDesafio(criarDesafioDto);
    }

    @Get()
    async consultarDesafios(
        @Query('idJogador') _id: string): Promise<Array<Desafio>> {
        
            return _id? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
            : await this.desafiosService.consultarTodosDesafios();
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string): Promise<void> {            
            await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);

        }
    
    @Post('/:desafio/partida')
    async atribuirDesafioPartida(
        @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
        @Param('desafio') _id: string): Promise<void> {
            return await this.desafiosService.atribuirDesafioPartida(_id, atribuirDesafioPartidaDto);
        }

    @Delete('/:_id')
    async deletarDesafio(
        @Param('_id') _id: string): Promise<void> {
            await this.desafiosService.deletarDesafio(_id);
        }
}
