
package com.projeto.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.hospital.entity.Material;
import com.projeto.hospital.service.MaterialService;

import jakarta.validation.Valid;

// O prefixo "/materiais" será usado em todas as rotas deste controlador.
@RestController
@RequestMapping("/materiais")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    // Lista todos os materiais, com opcao de ordenação por nome ou codigo
    // GET /materiais?ordenarPor=nome ou ordenarPor=codigo
    @GetMapping
    public List<Material> getAll(@RequestParam(required = false) String ordenarPor) {
        if ("codigo".equalsIgnoreCase(ordenarPor)) {
            return materialService.findAllOrderedBy(Sort.by("codigoInterno"));
        }
        return materialService.findAllOrderedBy(Sort.by("nome"));
    }

    // Endpoint para buscar materiais por nome ou codigo
    // GET /materiais/search?query=algumaCoisa
    @GetMapping("/search")
    public List<Material> search(@RequestParam String query) {
        return materialService.searchByNomeOrCodigo(query);
    }

    // Endpoint para filtrar materiais por categoria
    // GET /materiais/filter?categoria=nomeDaCategoria
    @GetMapping("/filter")
    public List<Material> filterByCategoria(@RequestParam String categoria) {
        return materialService.filterByCategoria(categoria);
    }

    // Endpoint para obter um material especifico por ID
    // GET /materiais/{id}
    @GetMapping("/{id}")
    public Material getById(@PathVariable Long id) {
        return materialService.findById(id)
                .orElseThrow(() -> new RuntimeException("Material não encontrado"));
    }

    // Busca material por código interno (mais amigável para o usuário)
    @GetMapping("/codigo/{codigoInterno}")
    public Material getByCodigoInterno(@PathVariable String codigoInterno) {
        return materialService.findByCodigoInterno(codigoInterno)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Material com esse código não encontrado"));
    }

    // Endpoint para cadastrar um novo material
    // POST /materiais
    @PostMapping
    public Material create(@RequestBody @Valid Material material) {
        return materialService.create(material);
    }

    // Endpoint para editar um material existente
    // PUT /materiais/{id}
    @PutMapping("/{id}")
    public Material update(@PathVariable Long id, @RequestBody @Valid Material material) {
        return materialService.update(id, material);
    }
}
